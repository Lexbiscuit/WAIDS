import connectMongoDB from "@/libs/mongoose";
import Investigation from "@/models/investigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  await connectMongoDB();
  const { id } = await request.json();
  await Investigation.findByIdAndDelete(String(id));
  return NextResponse.json(
    { message: "Investigation successfully deleted!" },
    { status: 200 }
  );
}
