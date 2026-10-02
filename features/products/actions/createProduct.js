"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function createProduct(productData) {
  try {
    await connectToDatabase();
    await Product.create(productData);
    return { success: true };
  } catch (_) {
    return { success: false };
  }
}
