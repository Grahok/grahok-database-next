import { connectToDatabase } from "@/lib/mongoose";
import Entry from "@/models/Entry";

export async function GET(_, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();

    const entry = await Entry.findById(id);
    return Response.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    return new Response("Failed to fetch entry", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const data = await req.json();

    const entry = await Entry.findByIdAndUpdate(id, data, { new: true });
    return Response.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    return new Response("Failed to fetch entry", { status: 500 });
  }
}