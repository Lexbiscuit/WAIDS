import connectMongoDB from "@/libs/mongoose";
import Quote from "@/models/quote";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, subscription, accounts } = body;

  let response;

  try {
    await connectMongoDB();
    await Quote.create({
      name: name,
      email: email,
      phone: phone,
      subscription: subscription,
      accounts: accounts,
    }).then();
    response = NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    response = NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
