// @/app/api/entries/route.js

import { connectToDatabase } from "@/lib/mongoose";
import Entry from "@/models/Entry";
import Customer from "@/models/Customer";

export async function GET() {
  try {
    await connectToDatabase();

    const entries = await Entry.find().populate("customer", "name");
    return Response.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return new Response("Failed to fetch entries", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Optional: Validate required fields before inserting
    if (
      !body.customer ||
      !body.orderDate ||
      !body.entryDate ||
      !body.products?.length
    ) {
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

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json(); // ✅ correctly parse the request body
    const deleted = await Entry.deleteOne({ _id }); // ✅ use _id to delete
    if (deleted.deletedCount === 0) {
      return new Response("Entry not found", { status: 404 });
    }
    return Response.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
