import Entry from "@/models/CustomerEntry";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(_, { params }) {
  const { id: vendorId } = await params; // Correctly extract the 'id' parameter
  try {
    await connectToDatabase();

    // Find entries where the vendor matches the given vendorId
    const entries = await Entry.find({
      vendor: mongoose.Types.ObjectId.createFromHexString(vendorId),
    });

    // Return an empty array if no entries are found
    return Response.json(entries || []);
  } catch (error) {
    console.error("Error fetching entries for vendor:", error);
    return new Response("Failed to fetch entries", { status: 500 });
  }
}
