import connectMongoDB from "@/libs/mongoose";
import LogData from "@/models/logdata";
import IdsSource from "@/models/idssource";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
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

  const data = await LogData.find({
    event_type: "alert",
    ids_name: { $in: sources },
  })
    .sort({ timestamp: -1 })
    .limit(15);
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
