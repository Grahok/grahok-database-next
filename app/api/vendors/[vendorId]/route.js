import { connectToDatabase } from "@/lib/mongoose";
import Vendor from "@/models/Vendor";

export async function GET(_, { params }) {
  const { vendorId } = await params;
  try {
    await connectToDatabase();

    const vendor = await Vendor.findById(vendorId);
    return new Response(
      JSON.stringify({
        message: "✅ Vendor Fetched Successfully",
        vendor: vendor,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to fetch vendor",
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
  const { vendorId } = await params;
  try {
    await connectToDatabase();
    const vendorData = await req.json();
    const updatedProduct = await Vendor.findByIdAndUpdate(
      vendorId,
      vendorData,
      { new: true }
    );

    return new Response(
      JSON.stringify({
        message: "✅ Vendor Updated Successfully",
        updatedProduct: updatedProduct,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Vendor Mobile Number ERROR:", error);
      return new Response(
        JSON.stringify({
          message: "⚠️ Duplicate Vendor Mobile Number",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    } else {
      console.error("Error fetching or updating vendor:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to fetch vendor",
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
    const { vendorId } = await params;
    const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

    return new Response(
      JSON.stringify({
        message: "✅ Vendor deleted successfully",
        deletedVendor: deletedVendor,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error deleting vendor:", error);
    return new Response(
      JSON.stringify({
        message: "❌ Error deleting vendor",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
