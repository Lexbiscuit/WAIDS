import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/logdata";
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
  const data = await Suricata.find({ event_type: "alert" })
    .sort({ timestamp: -1 })
    .limit(10);
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
