"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function deleteProduct(productId) {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(productId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
