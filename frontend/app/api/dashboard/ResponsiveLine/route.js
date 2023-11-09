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

  const id = request.nextUrl.searchParams.get("id");
  let data = null;
  await connectMongoDB();
  const enabledSources = await IdsSource.find({ isEnabled: true });
  const sources = enabledSources.map((source) => source.name);

  if (id == "month") {
    data = await LogData.aggregate([
      {
        $match: {
          event_type: "alert",
          $expr: { $eq: [{ $year: "$timestamp" }, 2023] },
          ids_name: { $in: sources },
        },
      },
      {
        $group: { _id: { $month: "$timestamp" }, y: { $sum: 1 } },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: { _id: 0, x: "$_id", y: 1 },
      },
    ]);
  } else {
    data = await LogData.aggregate([
      { $match: { event_type: "alert" } },
      {
        $group: { _id: { $year: "$timestamp" }, y: { $sum: 1 } },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: { _id: 0, x: "$_id", y: 1 },
      },
    ]);
  }
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
