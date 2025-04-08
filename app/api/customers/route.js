import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const customer = new Customer(body);
    await customer.save();
    console.log("Customer Created Successfully!")

    return Response.json({ message: "Customer Added Successfully!" });
  } catch (error) {
    console.error(error);
    return new Response("Error creating customer", { status: 500 });
  }
}
