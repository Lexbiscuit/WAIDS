import connectMongoDB from "@/libs/mongoose";
import IdsSource from "@/models/idssource";
import LogData from "@/models/logdata";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  try {
    await connectMongoDB();
    const allSources = await LogData.distinct("ids_name");

    const currentSources = await IdsSource.distinct("name");

    const newSources = allSources.filter(
      (source) => !currentSources.includes(source)
    );

    if (newSources.length > 0) {
      // add the new sources to the IdsSource collection
      newSources.map(async (source) => {
        await IdsSource.create({ name: source, isEnabled: true });
      });
    }
  } catch (e) {
    console.log(e);
  }

  const data = await IdsSource.find({});

  const response = NextResponse.json(data);
  response.headers.append("Access-Control-Allow-Origin", "*");
  return response;
}
