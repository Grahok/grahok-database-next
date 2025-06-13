"use server"

import { connectToDatabase } from "@/lib/mongoose";
import CourierInfo from "@/models/CourierInfo";

export default async function deleteCourierInfo(courierInfoId) {
  try {
    await connectToDatabase();

    const deletedCourierInfo = await CourierInfo.findByIdAndDelete(courierInfoId);

    return new Response(
      JSON.stringify({
        message: "✅ Courier Info Deleted Successfully",
        deletedCourierInfo,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to delete courier info",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
