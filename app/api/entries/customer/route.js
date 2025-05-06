import { connectToDatabase } from "@/lib/mongoose";
import { UTCDate } from "@date-fns/utc";
import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export async function GET(req) {
  dayjs.extend(utc);
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const fromDate = `${url.searchParams.get("fromDate")}T00:00:00`;
    console.log(fromDate);
    const toDate = `${url.searchParams.get("toDate")}T23:59:59.999`;
    const search = url.searchParams.get("search");
    const orderStatus = url.searchParams.get("orderStatus");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage")) || 0;

    const startUTC = dayjs(new Date(fromDate)).utc().toISOString();
    console.log(startUTC);
    const endUTC = dayjs(new Date(toDate)).utc().toISOString();
    console.log(endUTC);

    const query = {};

    if (fromDate && toDate) {
      query.orderDate = {
        $gte: startUTC,
        $lte: endUTC,
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

    if (orderStatus) {
      query.orderStatus = orderStatus;
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
