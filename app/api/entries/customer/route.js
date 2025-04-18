import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();

    const entries = await CustomerEntry.find().populate(
      "customer",
      "name mobileNumber"
    );
    return new Response("Fetching Entries Successful", {
      status: 200,
      entries: entries,
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return new Response("Failed to fetch entries", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Map products to include only the product reference and other fields
    const products = body.products.map((p) => ({
      product: p.product, // Reference to Product model
      quantity: p.quantity,
      purchasePrice: p.purchasePrice,
      sellPrice: p.sellPrice,
      discount: p.discount,
      subtotal: p.subtotal,
    }));

    for await (const p of products) {
      const product = await Product.findById(p.product);
      await Product.findByIdAndUpdate(
        p.product,
        {
          $inc: {
            inStock: -p.quantity,
          },
        },
        { new: true }
      );
    }

    const entry = new CustomerEntry({ ...body, products });
    await entry.save();

    console.log("✅ Entry created:", entry._id);

    return new Response({ message: "Entry created successfully", entry });
  } catch (error) {
    console.error("❌ Error creating entry:", error);
    return new Response("Error creating entry", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json(); // ✅ correctly parse the request body
    const deleted = await CustomerEntry.deleteOne({ _id }); // ✅ use _id to delete
    if (deleted.deletedCount === 0) {
      return new Response("Entry not found", { status: 404 });
    }
    return new Response({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
