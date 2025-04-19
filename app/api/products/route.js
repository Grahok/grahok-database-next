import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const product = await Product.create(body);

    return new Response(
      JSON.stringify({
        message: "Product Created Successfully!",
        product: product,
      })
    );
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Product Name ERROR:", error);
    } else {
      return new Response(
        JSON.stringify({
          message: "Error creating product",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    }
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find().sort({ name: 1 });
    return new Response(
      JSON.stringify({
        message: "Products fetched successfully",
        products: products,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch products",
        error: error.message,
      }),
      { status: 500, headers: { "Content-type": "application/json" } }
    );
  }
}
