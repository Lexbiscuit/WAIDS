import connectMongoDB from "@/libs/mongoose";
import Suricata from "@/models/suricata";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  const data = await Suricata.aggregate([
    {
        "$group": {"_id": "$" + id, "count": {"$sum": 1}}
    }, {
        "$sort": {"count": 1}
    }, {
        "$project": {"_id": 0, "id": "$_id", "value": "$count", "label": "$_id"}
    }
]);
  return NextResponse.json({ data });
}
