import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const product = new Product(body);
    await product.save();
    console.log("Product Created Successfully!");

    return Response.json({ message: "Product Added Successfully!" });
  } catch (error) {
    console.error(error);
    return new Response("Error creating product", { status: 500 });
  }
}
