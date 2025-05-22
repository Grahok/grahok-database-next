import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";
import { UTCDate } from "@date-fns/utc";

export async function POST(req) {
  try {
    await connectToDatabase();

    const customerData = await req.json();
    const createdCustomer = await Customer.create(customerData);

    return new Response(
      JSON.stringify({
        message: "✅ Customer Created Successfully!",
        createdCustomer: createdCustomer,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Customer Mobile Number ERROR:", error);
      return new Response(
        JSON.stringify({
          message: "⚠️ Duplicate Customer Mobile Number",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    } else {
      console.error("⚠️ Error creating customer:", error);
      return new Response(
        JSON.stringify({
          message: "Error creating customer",
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

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const customers = await Customer.find().sort({ entryDate: -1 });

//     return new Response(
//       JSON.stringify({
//         message: "✅ Customers fetched successfully",
//         customers: customers,
//       }),
//       {
//         status: 200,
//         headers: { "Content-type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("❌ Error fetching customers:", error);
//     return new Response(
//       JSON.stringify({
//         message: "❌ Error Fetching customers",
//         error: error.message,
//       }),
//       {
//         status: 500,
//         headers: { "Content-type": "application/json" },
//       }
//     );
//   }
// }

export async function GET(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const fromDate = url.searchParams.get("fromDate");
    const toDate = url.searchParams.get("toDate");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage")) || 0;

    const startUTC = new UTCDate(`${fromDate}T00:00:00`);
    const endUTC = new UTCDate(`${toDate}T23:59:59.999`);

    const query = {};

    if (fromDate && toDate) {
      query.entryDate = {
        $gte: new Date(startUTC),
        $lte: new Date(endUTC),
      };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
      ];
    }

    // Count total entries matching the query
    const totalCustomers = await Customer.countDocuments(query);
    const totalPages = Math.ceil(totalCustomers / itemsPerPage) || 1;

    // Fetch paginated entries
    const customers = await Customer.find(query)
      .sort({ orderDate: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return new Response(
      JSON.stringify({
        message: "Fetching Customers Successful",
        customers,
        pagination: {
          totalCustomers,
          totalPages,
        },
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching customers:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch customers",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
