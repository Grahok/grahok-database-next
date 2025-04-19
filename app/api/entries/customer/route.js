import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();

    const entries = await CustomerEntry.find().populate(
      "products.product",
      "name"
    );
    return new Response(
      JSON.stringify({
        message: "Fetching Entries Successful",
        entries: entries,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching entries:", error);
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

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const products = body.products.map((p) => ({
      product: p.product, // Reference to Product model
      quantity: p.quantity,
      purchasePrice: p.purchasePrice,
      sellPrice: p.sellPrice,
      discount: p.discount,
      subtotal: p.subtotal,
    }));

    for await (const p of products) {
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

    const entry = await CustomerEntry.create({ ...body, products });
    return new Response({
      message: "✅ Entry created successfully",
      entry: entry,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Error creating entry",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}