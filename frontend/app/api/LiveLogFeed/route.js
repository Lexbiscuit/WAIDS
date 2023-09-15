import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const data = await Suricata.find().limit(10);
  return NextResponse.json({ data });
}
