"use server";

import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchCustomerEntries() {
  await connectToDatabase();
  const customerEntries = await CustomerEntry.find()
    .populate("customer", "name mobileNumber")
    .populate("products.product", "name");
  return mongooseDocumentToPlainObject(customerEntries);
}
