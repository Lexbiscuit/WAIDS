import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return new NextResponse(400, "Email is required");
  }

  await connectMongoDB();
  const user = await User.find({
    email: `${email}`,
  });

  if (user.length == 1) {
    return NextResponse.json({ user });
  } else {
    return new NextResponse(404, "User not found");
  }
}
