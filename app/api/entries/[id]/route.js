import { connectToDatabase } from "@/lib/mongoose";
import Entry from "@/models/Entry";

export async function GET(_, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();

    // Populate the customer and product fields
    const entry = await Entry.findById(id)
      .populate("customer", "name")
      .populate("products.product", "name"); // Populate product names

    if (!entry) {
      return new Response("Entry not found", { status: 404 });
    }

    return Response.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    return new Response("Failed to fetch entry", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const data = await req.json();

    const entry = await Entry.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("customer", "name");
    if (!entry) {
      return new Response("Entry not found", { status: 404 });
    }

    return Response.json(entry);
  } catch (error) {
    console.error("Error updating entry:", error);
    return new Response("Failed to update entry", { status: 500 });
  }
}
