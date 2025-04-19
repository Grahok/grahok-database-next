import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(_, { params }) {
  const { entryId } = await params;
  try {
    await connectToDatabase();

    const entry = await CustomerEntry.findById(entryId)
      .populate("customer", "name mobileNumber address")
      .populate("products.product", "name");

    return new Response(
      JSON.stringify({
        message: "✅ Entry Fetched Successfully",
        entry: entry,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching entry:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch entry",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}

export async function DELETE(_, { params }) {
  const { entryId } = await params;

  try {
    await connectToDatabase();
    const deletedEntry = await CustomerEntry.findByIdAndDelete(entryId);
    return new Response({
      message: "✅ Entry deleted successfully",
      deletedEntry: deletedEntry,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Error deleting entry",
        error: error.message,
      }),
      { status: 500, headers: { "Content-type": "application/json" } }
    );
  }
}
