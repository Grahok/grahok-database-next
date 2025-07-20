"use server";

import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchCustomerEntriesByCustomerId(customerId) {
  await connectToDatabase();
  const customerEntries = await CustomerEntry.find({ customer: customerId });
  return mongooseDocumentToPlainObject(customerEntries);
}
