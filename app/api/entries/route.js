// @/app/api/entries/route.js

import { connectToDatabase } from "@/lib/mongoose";
import Entry from "@/models/Entry";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Optional: Validate required fields before inserting
    if (!body.customer || !body.orderDate || !body.entryDate || !body.products?.length) {
      return new Response("Missing required fields", { status: 400 });
    }

    const entry = new Entry(body);
    await entry.save();

    console.log("✅ Entry created:", entry._id);

    return Response.json({ message: "Entry created successfully", entry });
  } catch (error) {
    console.error("❌ Error creating entry:", error);
    return new Response("Error creating entry", { status: 500 });
  }
}
