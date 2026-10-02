"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchCustomers() {
  await connectToDatabase();
  const customers = await Customer.find();
  return mongooseDocumentToPlainObject(customers);
}
