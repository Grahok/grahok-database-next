import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const customer = new Customer(body);
    await customer.save();
    console.log("Customer Created Successfully!");

    return Response.json({ message: "Customer Created Successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Customer Mobile Number ERROR:", error);
    } else {
      console.error("⚠️ Duplicate Customer Mobile Number ERROR:", error);
      return new Response("Error creating customer", { status: 500 });
    }
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const customers = await Customer.find({});
    return Response.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return new Response("Failed to fetch customers", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json(); // ✅ correctly parse the request body
    const deleted = await Customer.deleteOne({ _id }); // ✅ use _id to delete
    if (deleted.deletedCount === 0) {
      return new Response("Customer not found", { status: 404 });
    }
    return Response.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
