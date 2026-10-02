"use server";

import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";
import Customer from "@/models/Customer";
import Product from "@/models/Product";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchCustomerEntry(entryId) {
  await connectToDatabase();
  const customerEntry = await CustomerEntry.findById(entryId)
    .populate("customer", "name mobileNumber address")
    .populate("products.product", "name inStock");
  return mongooseDocumentToPlainObject(customerEntry);
}
