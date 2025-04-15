import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export async function GET(_, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();

    const customer = await Customer.findById(id);
    return Response.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return new Response("Failed to fetch customer", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const data = await req.json();

    const customer = await Customer.findByIdAndUpdate(id, data, { new: true });
    console.log("Customer Updated Successfully");
    return Response.json(customer);
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Customer Mobile Number ERROR:", error);
    } else {
      console.error("Error fetching or updating customer:", error);
      return new Response("Failed to fetch customer", { status: 500 });
    }
  }
}
