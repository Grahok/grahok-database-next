import { connectToDatabase } from "@/lib/mongoose";
import Vendor from "@/models/Vendor";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const vendor = await Vendor.create(body);
    console.log("Vendor Created Successfully:", vendor._id);

    return new Response(
      JSON.stringify({
        message: "Vendor Created Successfully!",
        vendor: vendor,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error creating vendor",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const vendors = await Vendor.find({});
    return new Response(
      JSON.stringify({
        message: "Vendors fetched successfully",
        vendors: vendors,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching vendors:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to fetch vendors",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json();
    const deletedVendor = await Vendor.deleteOne({ _id });

    return new Response(
      JSON.stringify({
        message: "✅ Vendor deleted successfully",
        deletedVendor: deletedVendor,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting Vendor",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
