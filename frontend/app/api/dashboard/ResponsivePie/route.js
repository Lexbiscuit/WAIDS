import connectMongoDB from "@/libs/mongoose";
import LogData from "@/models/logdata";
import IdsSource from "@/models/idssource";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const chartCategory = request.nextUrl.searchParams.get("chartCategory");
  const timeframe = request.nextUrl.searchParams.get("timeframe");

  await connectMongoDB();
  const enabledSources = await IdsSource.find({ isEnabled: true });
  const sources = enabledSources.map((source) => source.name);

  const groupObj = {};
  groupObj[`${chartCategory}`] = `$${chartCategory}`;

  let timeframeInMs = 0;
  if (timeframe == "hour") {
    timeframeInMs = 1000 * 60 * 60;
  } else if (timeframe == "day") {
    timeframeInMs = 1000 * 60 * 60 * 24;
  } else if (timeframe == "week") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7;
  } else if (timeframe == "month") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7 * 4;
  } else if (timeframe == "halfyear") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
  } else if (timeframe == "year") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7 * 4 * 12;
  }

  const data = await LogData.aggregate([
    {
      $match: {
        timestamp: {
          $gte: new Date(new Date() - timeframeInMs),
        },
        ids_name: { $in: sources },
      },
    },
    {
      $group: {
        _id: groupObj,
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        id: `$_id.${chartCategory}`,
        label: `$_id.${chartCategory}`,
        value: "$count",
      },
    },
  ]);

  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
