import { connectToDatabase } from "@/lib/mongoose";
import CourierInfo from "@/models/CourierInfo";

export default async function fetchCourierLists() {
  try {
    await connectToDatabase();

    const courierInfo = await CourierInfo.find();

    return new Response(
      JSON.stringify({
        message: "✅ Courier Info Fetched Successfully",
        courierInfo,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to fetch courier info",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
