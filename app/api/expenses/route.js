import { connectToDatabase } from "@/lib/mongoose";
import Expense from "@/models/Expense";

export async function POST(req) {
  try {
    await connectToDatabase();

    const expenseData = await req.json();
    const createdExpense = await Expense.create(expenseData);

    return new Response(
      JSON.stringify({
        message: "✅ Expense Created Successfully!",
        createdExpense: createdExpense,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === 11000) {
      console.error("⚠️ Duplicate Expense Mobile Number ERROR:", error);
      return new Response(
        JSON.stringify({
          message: "⚠️ Duplicate Expense Mobile Number",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    } else {
      console.error("⚠️ Error creating expense:", error);
      return new Response(
        JSON.stringify({
          message: "Error creating expense",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-type": "application/json" },
        }
      );
    }
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const expenses = await Expense.find().sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({
        message: "✅ Expenses fetched successfully",
        expenses: expenses,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching expenses:", error);
    return new Response(
      JSON.stringify({
        message: "❌ Error Fetching expenses",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
