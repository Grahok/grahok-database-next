"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchCustomer(customerId) {
  await connectToDatabase();
  const customer = await Customer.findById(customerId);
  return mongooseDocumentToPlainObject(customer);
}
