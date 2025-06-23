"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";
import mongooseDocumentToPlainObject from "@/utils/mongooseDocumentToPlainObject";

export default async function fetchProducts() {
  await connectToDatabase();
  const products = await Product.find();
  return mongooseDocumentToPlainObject(products);
}
