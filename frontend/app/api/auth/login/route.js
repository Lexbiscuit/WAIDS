import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const credentials = await request.json();

  if (
    !credentials ||
    credentials.email == null
  ) {
    return null;
  }

  await connectMongoDB();
  const data = await User.find({
    email: `${credentials.email}`
  });

  if (data.length == 1) {
    return NextResponse.json({ data });
  } else {
    return null;
  }
}
