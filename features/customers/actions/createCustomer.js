"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function createCustomer(customerData) {
  try {
    await connectToDatabase();
    const createdCustomer = await Customer.create(customerData);
    return {
      success: true,
      createdCustomer: mongooseDocumentToPlainObject(createdCustomer),
    };
  } catch (_) {
    return { success: false, createdCustomer: null };
  }
}
