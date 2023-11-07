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

  await connectMongoDB();
  const enabledSources = await IdsSource.find({ isEnabled: true });
  const sources = enabledSources.map((source) => source.name);

  const data = await LogData.aggregate([
    { $match: { ids_name: { $in: sources }, event_type: "alert" } },
    { $sort: { timestamp: -1 } },
  ]);
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
