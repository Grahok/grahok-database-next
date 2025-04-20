import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

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

export async function GET() {
  try {
    await connectToDatabase();
    const customers = await Customer.find().sort({ entryDate: -1 });

    return new Response(
      JSON.stringify({
        message: "✅ Customers fetched successfully",
        customers: customers,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    return new Response(
      JSON.stringify({
        message: "❌ Error Fetching customers",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
