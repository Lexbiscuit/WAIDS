import connectMongoDB from "@/libs/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const { chartIdx } = await request.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  let response;
  try {
    await connectMongoDB();
    const { charts: currentCharts, _id: objectId } = await User.findOne(
      {
        email: session.user.email,
      },
      { _id: 1, charts: 1 }
    );

    const newCharts = Array(
      ...currentCharts.slice(0, chartIdx),
      ...currentCharts.slice(chartIdx + 1)
    );

    await User.findByIdAndUpdate(objectId, {
      $set: { charts: newCharts },
    });

    response = NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.log("🚀 ~ file: route.js:34 ~ POST ~ e:", e);

    response = NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
