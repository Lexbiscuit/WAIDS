import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";

export async function GET(request) {
  const skip = request.nextUrl.searchParams.get("skip");
  const limit = request.nextUrl.searchParams.get("limit");

  await connectMongoDB();
  const data = await Suricata.find()
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  return NextResponse.json({ data });
}
