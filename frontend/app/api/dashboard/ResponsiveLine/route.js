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
  const matchValue = request.nextUrl.searchParams.get("matchValue");
  const matchObj = {};
  matchObj[`${chartCategory}`] = matchValue;

  const timeCategory = request.nextUrl.searchParams.get("timeCategory");

  let data = null;
  await connectMongoDB();
  const enabledSources = await IdsSource.find({ isEnabled: true });
  const sources = enabledSources.map((source) => source.name);

  let groupObj;
  if (timeCategory == "hourOfDay") {
    groupObj = { $hour: "$timestamp" };
  } else if (timeCategory == "dayOfWeek") {
    groupObj = { $dayOfWeek: "$timestamp" };
  } else if (timeCategory == "dayOfWeek") {
    groupObj = { $dayOfMonth: "$timestamp" };
  } else if (timeCategory == "WeekOfMonth") {
    groupObj = { $week: "$timestamp" };
  } else if (timeCategory == "monthOfYear") {
    groupObj = { $month: "$timestamp" };
  } else if (timeCategory == "year") {
    groupObj = { $year: "$timestamp" };
  }

  let timeframeInMs = 0;
  if (timeCategory == "hourOfDay") {
    timeframeInMs = 1000 * 60 * 60 * 24;
  } else if (timeCategory == "dayOfWeek") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7;
  } else if (timeCategory == "WeekOfMonth") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7 * 4;
  } else if (timeCategory == "monthOfYear") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7 * 30;
  } else if (timeCategory == "year") {
    timeframeInMs = 1000 * 60 * 60 * 24 * 7 * 30 * 12 * 5;
  }

  data = await LogData.aggregate([
    {
      $match: {
        ...matchObj,
        timestamp: {
          $gte: new Date(new Date() - timeframeInMs),
        },
        ids_name: { $in: sources },
      },
    },
    {
      $group: {
        _id: groupObj,
        y: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: { _id: 1, x: "$_id", y: 1 },
    },
  ]);

  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
