import Entry from "@/models/Entry";

export async function getEntriesByCustomerId(customerId) {
  try {
    const entries = await Entry.find({ customer: new mongoose.Types.ObjectId(customerId) });
    return entries;
  } catch (error) {
    console.error("Error fetching entries by customerId:", error);
    throw error;
  }
}
