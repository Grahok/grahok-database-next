"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export default async function sendOrderToSteadfast(orderData) {
  try {
    const API_KEY = process.env.STEADFAST_API_KEY;
    const SECRET_KEY = process.env.STEADFAST_SECRET_KEY;
    if (!API_KEY || !SECRET_KEY) {
      throw new Error(
        "Steadfast API credentials are not set in environment variables.",
      );
    }
    await connectToDatabase();
    const customer = await Customer.findById(orderData.customer);
    if (!customer) {
      throw new Error("Customer not found");
    }
    const response = await fetch(
      "https://portal.packzy.com/api/v1/create_order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": API_KEY,
          "Secret-Key": SECRET_KEY,
        },
        body: JSON.stringify({
          invoice: orderData.invoiceNumber || orderData._id,
          recipient_name: customer.name,
          recipient_phone: customer.mobileNumber,
          recipient_address: customer.address,
          cod_amount: orderData.paidByCustomer,
        }),
      },
    );
    const { status, message, consignment } = await response.json();
    if (status !== 200) {
      throw new Error(`Failed to send order to Steadfast: ${message}`);
    }
    return { status, consignment };
  } catch (error) {
    throw error;
  }
}
