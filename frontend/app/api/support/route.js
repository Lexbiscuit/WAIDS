import connectMongoDB from "@/libs/mongoose";
import Support from "@/models/support";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(request) {
  // const session = await getServerSession(request, res, authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }
  const body = await request.json();
  const { name, email, message } = body;
  
  try {
    await connectMongoDB();
    await Support.create({
      name: name,
      email: email,
      message: message,
    }).then();
    const response = NextResponse.json({ message: "success" }, { status: 200 });
    response.headers.append("Access-Control-Allow-Origin", "*");
    return response;
  } catch (e) {
    const response = NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    response.headers.append("Access-Control-Allow-Origin", "*");
    return response;
  }
}
