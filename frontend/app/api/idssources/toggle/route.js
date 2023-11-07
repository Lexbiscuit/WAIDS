import connectMongoDB from "@/libs/mongoose";
import IdsSource from "@/models/idssource";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function PUT(request) {
  //   const session = await getServerSession();
  //   if (!session) {
  //     return NextResponse.json(
  //       { error: "Internal Server Error" },
  //       { status: 500 }
  //     );
  //   }

  try {
    const { name, isEnabled } = await request.json();
    await connectMongoDB();
    await IdsSource.updateOne({ name: name }, { isEnabled: isEnabled });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "IDS Source successfully updated." },
    { status: 200 }
  );
}
