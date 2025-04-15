import { connectToDatabase } from "@/lib/mongoose";
import Vendor from "@/models/Vendor";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const vendor = new Vendor(body);
    await vendor.save();
    console.log("Vendor Created Successfully:", vendor._id);

    // Return the created vendor's _id along with the success message
    return Response.json({
      message: "Vendor Created Successfully!",
      _id: vendor._id,
    });
  } catch (error) {
    console.error(error);
    return new Response("Error creating vendor", { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const vendors = await Vendor.find({});
    return Response.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return new Response("Failed to fetch vendors", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { _id } = await req.json(); // ✅ correctly parse the request body
    const deleted = await Vendor.deleteOne({ _id }); // ✅ use _id to delete
    if (deleted.deletedCount === 0) {
      return new Response("Vendor not found", { status: 404 });
    }
    return Response.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
