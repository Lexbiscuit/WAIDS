import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
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

  const skip = request.nextUrl.searchParams.get("skip");
  const limit = request.nextUrl.searchParams.get("limit");

  await connectMongoDB();
  const data = await Suricata.find()
    .sort({ timestamp: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  const response = NextResponse.json({ data });
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
