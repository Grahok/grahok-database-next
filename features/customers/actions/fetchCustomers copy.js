"use server"

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export default async function fetchCustomers() {
  try {
    await connectToDatabase();

    const customers = await Customer.find();

    return new Response(
      JSON.stringify({
        message: "✅ Customers Fetched Successfully",
        customers,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to fetch customers",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
