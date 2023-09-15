import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const data = await Suricata.find().sort({"time": -1}).limit(10);
  const response = NextResponse.json({ data });
  response.headers.append('Access-Control-Allow-Origin', '*');
  return response;
}
