import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";

export async function GET(request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }

  await connectMongoDB(request);
  const data = await Suricata.countDocuments();
  const response = NextResponse.json({data});
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
