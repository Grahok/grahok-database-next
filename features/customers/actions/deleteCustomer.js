"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export default async function deleteCustomer(customerId) {
  try {
    await connectToDatabase();
    await Customer.findByIdAndDelete(customerId);
    return { success: true };
  } catch (_) {
    return { success: false };
  }
}
