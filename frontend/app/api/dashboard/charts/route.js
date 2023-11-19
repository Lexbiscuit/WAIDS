import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
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

  await connectMongoDB();
  try {
    const data = await User.findOne(
      { email: session.user.email },
      { _id: 0, name: 0, email: 0, password: 0, role: 0, status: 0 }
    );
    const response = NextResponse.json(data);
    response.headers.append("Access-Control-Allow-Origin", "*");
    return response;
  } catch (err) {}
}
