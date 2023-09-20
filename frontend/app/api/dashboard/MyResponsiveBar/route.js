import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  const data = await Suricata.aggregate([
    {
      $group: {_id: "$"+id, value: {$sum: 1}}
    }, 
    {
      $sort: {"value": -1}}, {$project: {_id:0, id: "$_id", value: true}
    }
    ]);

  const response = NextResponse.json({ data });
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}