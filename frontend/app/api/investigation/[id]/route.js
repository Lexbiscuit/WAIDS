import connectMongoDB from "@/libs/mongoose";
import LogData from "@/models/logdata";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(request, context) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  await connectMongoDB();
  const data = await LogData.findById(context.params.id);
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
