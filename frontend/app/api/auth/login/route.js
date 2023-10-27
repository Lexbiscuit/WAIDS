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
  console.log(email)
  const user = await User.find({
    email: `${email}`,
  });
  // const user = User.findOne({ email })

  console.log(user)
  if (user.length == 1) {
    return NextResponse.json({ user });
  } else {
    return new NextResponse(404, "User not found");
  }
}
