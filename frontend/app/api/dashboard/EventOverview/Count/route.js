import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  await connectMongoDB();
  const data = await Suricata.aggregate([
    { $match: { event_type: "alert" } },
    { $group: { _id: null, count: { $sum: 1 } } },
    { $project: { _id: 0 } },
  ]);
  const response = NextResponse.json(data[0]);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
