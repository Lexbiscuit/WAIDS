import connectMongoDB from "@/libs/mongoose";
import LogData from "@/models/logdata";
import Investigation from "@/models/investigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  await connectMongoDB();
  const { id, creator, description, investigation_status } =
    await request.json();
  const temp = await LogData.findById(id).exec();
  const details = {
    creator: creator,
    description: description,
    investigation_status: investigation_status,
  };
  const merged = { ...temp, ...details };
  Mongoose.connection.db.collection("Investigation").insertOne(merged);
  return NextResponse.json({}, { status: 200 });
}

export async function PUT(request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
  const { id, value } = await request.json();
  console.log("🚀 ~ file: route.js:41 ~ PUT ~ value:", value);
  console.log("🚀 ~ file: route.js:41 ~ PUT ~ id:", id);
  await connectMongoDB();

  const filter = { _id: String(id) };
  const update = { investigation_status: String(value) };

  await Investigation.findOneAndUpdate(filter, update);

  return NextResponse.json({}, { status: 200 });
}
