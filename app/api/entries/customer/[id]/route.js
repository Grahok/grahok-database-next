import Entry from "@/models/Entry";

export async function GET(_, { params }) {
  const { customerId } = await params;
  try {
    await connectToDatabase();

    // Populate the entry and product fields
    const entry = await Entry.find({ customer: customerId });

    if (!entry) {
      return new Response("Entry not found", { status: 404 });
    }

    return Response.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    return new Response("Failed to fetch entry", { status: 500 });
  }
}
