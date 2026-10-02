import { connectToDatabase } from "@/lib/mongoose";
import CourierInfo from "@/models/CourierInfo";

export async function GET() {
  try {
    await connectToDatabase();
    
    const courierInfo = await CourierInfo.find({});

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

export async function POST(req) {
  try {
    await connectToDatabase();

    const courierInfo = await req.json();
    const createdCourierInfo = await CourierInfo.create(courierInfo);

    return new Response(
      JSON.stringify({
        message: "✅ Courier Info Added Successfully",
        createdCourierInfo,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to add courier info",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
