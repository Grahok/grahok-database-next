"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchProduct(productId) {
  await connectToDatabase();
  const product = await Product.findById(productId);
  return mongooseDocumentToPlainObject(product);
}
