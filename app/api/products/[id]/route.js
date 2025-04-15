import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(_, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();

    const product = await Product.findById(id);
    return Response.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response("Failed to fetch product", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const data = await req.json();

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    console.log("Product Updated Successfully!");
    return Response.json(product);
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Product Name ERROR:", error);
    } else {
      console.error("Error fetching or updating product:", error);
      return new Response("Failed to fetch product", { status: 500 });
    }
  }
}
