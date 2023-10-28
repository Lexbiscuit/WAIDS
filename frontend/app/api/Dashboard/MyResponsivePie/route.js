import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/logdata";
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
  await connectMongoDB();
  const data = await Suricata.aggregate([
    { $match: { event_type: "alert" } },
    {
      $group: { _id: "$" + id, count: { $sum: 1 } },
    },
    {
      $sort: { count: 1 },
    },
    {
      $project: { _id: 0, id: "$_id", value: "$count", label: "$_id" },
    },
  ]);
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
