import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const credentials = await request.json();

  if (
    !credentials ||
    credentials.email == null ||
    credentials.password == null
  ) {
    return NextResponse.json({ authentication: "FAILED" });
  }

  await connectMongoDB();
  const data = await User.find({
    email: `${credentials.email}`,
    password: `${credentials.password}`,
  });

  if (data.length == 1) {
    return NextResponse.json({ data });
  } else {
    return null;
  }
}
