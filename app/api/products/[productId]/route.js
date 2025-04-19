import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(_, { params }) {
  const { productId } = await params;
  try {
    await connectToDatabase();

    const product = await Product.findById(productId);
    return new Response(
      JSON.stringify({
        message: "✅ Product Fetched Successfully",
        product: product,
      })
    );
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return new Response(
      JSON.stringify({
        message: "❌ Failed to fetch product",
        error: error,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}

export async function PUT(req, { params }) {
  const { productId } = await params;
  try {
    await connectToDatabase();
    const data = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    return new Response(
      JSON.stringify({
        message: "✅ Product updated successfully",
        updatedProduct: updatedProduct,
      })
    );
  } catch (error) {
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({
          message: "⚠️ Duplicate Product Name",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "❌ Failed to update product",
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

export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const { productId } = await params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return new Response(
      JSON.stringify({
        message: "Product deleted successfully",
        deletedProduct: deletedProduct,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
