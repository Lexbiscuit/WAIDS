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
  return NextResponse.json({ data });
}
