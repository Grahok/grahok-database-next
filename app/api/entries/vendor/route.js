import { connectToDatabase } from "@/lib/mongoose";
import VendorEntry from "@/models/VendorEntry";
import Vendor from "@/models/Vendor";

export async function GET() {
  try {
    await connectToDatabase();

    const entries = await VendorEntry.find().populate(
      "vendor",
      "name mobileNumber"
    );
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

    // Validate required fields before inserting
    // if (
    //   !body.vendor ||
    //   !body.orderDate ||
    //   !body.entryDate ||
    //   !body.products?.length
    // ) {
    //   return new Response("Missing required fields", { status: 400 });
    // }

    // Map products to include only the product reference and other fields
    const products = body.products.map((p) => ({
      product: p.product, // Reference to Product model
      quantity: p.quantity,
      purchasePrice: p.purchasePrice,
      sellPrice: p.sellPrice,
      discount: p.discount,
      subtotal: p.subtotal,
    }));

    const entry = new VendorEntry({ ...body, products });
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
