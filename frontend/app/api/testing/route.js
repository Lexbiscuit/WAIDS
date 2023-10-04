import connectMongoDB from "@/libs/mongoose";
import { Anomaly, Alert } from "@/models/suricata";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";

export async function GET() {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }

  await connectMongoDB();
  const data = await Anomaly.aggregate([
    { $match: { event_type: "anomaly" } },
    { $group: { _id: "$proto", count: { $sum: 1 } } },
  ]);
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
