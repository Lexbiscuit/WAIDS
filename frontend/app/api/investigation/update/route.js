import connectMongoDB from "@/libs/mongoose";
import LogData from "@/models/logdata";
import Investigation from "@/models/investigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const { id, value } = await request.json();

  await connectMongoDB();

  const update = { investigation_status: String(value) };

  await Investigation.findByIdAndUpdate(id, update);

  return NextResponse.json({}, { status: 200 });
}
