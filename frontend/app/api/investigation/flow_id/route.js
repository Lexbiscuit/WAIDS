import connectMongoDB from "@/libs/mongoose";
import LogData from "@/models/logdata";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const flow_id = request.nextUrl.searchParams.get("flow_id");
  await connectMongoDB();
  const data = await LogData.find({ flow_id: Number(flow_id) });
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
