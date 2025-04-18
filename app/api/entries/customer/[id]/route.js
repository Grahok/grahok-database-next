import CustomerEntry from "@/models/CustomerEntry";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(_, { params }) {
  const { id: customerId } = await params; // Correctly extract the 'id' parameter
  try {
    await connectToDatabase();

    // Find entries where the customer matches the given customerId
    const entries = await CustomerEntry.find({
      customer: mongoose.Types.ObjectId.createFromHexString(customerId),
    });

    // Return an empty array if no entries are found
    return Response.json(entries || []);
  } catch (error) {
    console.error("Error fetching entries for customer:", error);
    return new Response("Failed to fetch entries", { status: 500 });
  }
}
