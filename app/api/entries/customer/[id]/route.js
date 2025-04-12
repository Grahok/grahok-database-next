import Entry from "@/models/Entry";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(_, { params }) {
  const { id: customerId } = await params; // Correctly extract the 'id' parameter
  try {
    await connectToDatabase();

    // Find entries where the customer matches the given customerId
    const entries = await Entry.find({
      customer: mongoose.Types.ObjectId.createFromHexString(customerId),
    });

    if (!entries || entries.length === 0) {
      return new Response("No entries found for this customer", {
        status: 404,
      });
    }

    return Response.json(entries);
  } catch (error) {
    console.error("Error fetching entries for customer:", error);
    return new Response("Failed to fetch entries", { status: 500 });
  }
}
