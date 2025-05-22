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


export async function GET(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage")) || 0;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Count total entries matching the query
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / itemsPerPage) || 1;

    // Fetch paginated entries
    const products = await Product.find(query)
      .sort({ name: 1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return new Response(
      JSON.stringify({
        message: "Fetching Products Successful",
        products,
        pagination: {
          totalProducts,
          totalPages,
        },
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
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}