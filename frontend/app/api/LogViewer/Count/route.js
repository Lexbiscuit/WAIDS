import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const data = await Suricata.aggregate([
    {
      "$group": { "_id": "null", "count": { "$sum": 1 } },
    },
  ]);  
  const response = NextResponse.json({ data });
  response.headers.append('Access-Control-Allow-Origin', '*');
  return response;

}
