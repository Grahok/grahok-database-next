"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export default async function deleteCustomer(customerId) {
  await connectToDatabase();
  await Customer.findByIdAndDelete(customerId);
}
