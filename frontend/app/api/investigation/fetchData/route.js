import connectMongoDB from "@/libs/mongoose";
import Investigation from "@/models/investigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Mongoose from "mongoose";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  await connectMongoDB();
  // const data = await Investigation.find({}).sort({ timestamp: -1 });
  const data = await Mongoose.connection.db
    .collection("Investigation")
    .find({})
    .toArray();
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
