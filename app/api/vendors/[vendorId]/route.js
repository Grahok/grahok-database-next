import VendorEntry from "@/models/VendorEntry";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(_, { params }) {
  const { vendorId } = await params; // Correctly extract the 'id' parameter
  try {
    await connectToDatabase();

    // Find entries where the vendor matches the given vendorId
    const entries = await VendorEntry.find({
      vendor: vendorId,
    });
    return new Response(
      JSON.stringify({
        message: "Failed to fetch entries",
        entries: entries,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching entries for vendor:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch entries",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
