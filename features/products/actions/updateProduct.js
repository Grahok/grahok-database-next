"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function updateProduct(productId, productData) {
  try {
    await connectToDatabase();
    await Product.findByIdAndUpdate(productId, productData);
    return { success: true };
  } catch (_) {
    return { success: false };
  }
}
