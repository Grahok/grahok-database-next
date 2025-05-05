import { connectToDatabase } from "@/lib/mongoose";
import Customer from "@/models/Customer";

export async function GET(_, { params }) {
  const { customerId } = await params;
  try {
    await connectToDatabase();

    const customer = await Customer.findById(customerId);
    return new Response(
      JSON.stringify({
        message: "✅ Customer Fetched Successfully",
        customer: customer,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to fetch customer",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}

export async function PUT(req, { params }) {
  const { customerId } = await params;
  try {
    await connectToDatabase();
    const customerData = await req.json();
    const updatedProduct = await Customer.findByIdAndUpdate(
      customerId,
      customerData,
      { new: true }
    );

    return new Response(
      JSON.stringify({
        message: "✅ Customer Updated Successfully",
        updatedProduct: updatedProduct,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Customer Mobile Number ERROR:", error);
      return new Response(
        JSON.stringify({
          message: "⚠️ Duplicate Customer Mobile Number",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    } else {
      console.error("Error updating customer:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to update customer",
          error: error.message,
        }),
        { status: 500 }
      );
    }
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const { customerId } = await params;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    return new Response(
      JSON.stringify({
        message: "✅ Customer deleted successfully",
        deletedCustomer: deletedCustomer,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error deleting customer:", error);
    return new Response(
      JSON.stringify({
        message: "❌ Error deleting customer",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
