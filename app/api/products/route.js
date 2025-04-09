import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const product = new Product(body);
    await product.save();
    console.log("Product Created Successfully!");

    return Response.json({ message: "Product Created Successfully!" });
  } catch (error) {
    console.error(error);
    return new Response("Error creating product", { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find({});
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json(); // ✅ correctly parse the request body
    const deleted = await Product.deleteOne({ _id }); // ✅ use _id to delete
    if (deleted.deletedCount === 0) {
      return new Response("Product not found", { status: 404 });
    }
    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
