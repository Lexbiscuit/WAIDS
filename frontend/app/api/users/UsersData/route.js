import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }

  await connectMongoDB();
  const data = await User.find();
  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }

  await connectMongoDB();
  const { _id, ...details } = await request.json();
  let status = {};
  await User.findByIdAndUpdate(_id, details)
    .then(() => {
      status.message = "Update successful.";
    })
    .catch(() => (status.message = "Update unsuccessful."));

  const response = NextResponse.json(status);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
