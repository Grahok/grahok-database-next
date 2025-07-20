"use server";

import { connectToDatabase } from "@/lib/mongoose";
import CustomerEntry from "@/models/CustomerEntry";

export default async function deleteCustomerEntry(entryId) {
  try {
    await connectToDatabase();
    await CustomerEntry.findByIdAndDelete(entryId);
    return { success: true };
  } catch (_) {
    return { success: false };
  }
}
