import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const fromDate = url.searchParams.get("fromDate");
    const toDate = url.searchParams.get("toDate");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage")) || 0;

    const query = {};

    if (fromDate && toDate) {
      query.orderDate = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    if (search) {
      const matchedCustomers = await Customer.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { mobileNumber: { $regex: search, $options: "i" } },
        ],
      }).select("_id");

      const customerIds = matchedCustomers.map((c) => c._id);

      query.customer = { $in: customerIds };
    }

    // Count total entries matching the query
    const totalEntries = await CustomerEntry.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

    // Fetch paginated entries
    const entries = await CustomerEntry.find(query)
      .populate("customer", "name mobileNumber")
      .populate("products.product", "name")
      .sort({ orderDate: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return new Response(
      JSON.stringify({
        message: "Fetching Entries Successful",
        entries: entries,
        pagination: {
          totalEntries,
          totalPages,
        },
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
