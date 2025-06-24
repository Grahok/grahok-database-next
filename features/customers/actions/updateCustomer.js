"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export default async function updateCustomer(customerId, customerData) {
  try {
    await connectToDatabase();
    await Customer.findByIdAndUpdate(customerId, customerData);
    return { success: true };
  } catch (_) {
    return { success: false };
  }
}
