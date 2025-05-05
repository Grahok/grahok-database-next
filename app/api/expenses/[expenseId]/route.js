import { connectToDatabase } from "@/lib/mongoose";
import Expense from "@/models/Expense";

export async function GET(_, { params }) {
  const { expenseId } = await params;
  try {
    await connectToDatabase();

    const expense = await Expense.findById(expenseId);
    return new Response(
      JSON.stringify({
        message: "✅ Expense Fetched Successfully",
        expense: expense,
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "❌ Failed to fetch expense",
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
  const { expenseId } = await params;
  try {
    await connectToDatabase();
    const expenseData = await req.json();
    const updatedProduct = await Expense.findByIdAndUpdate(
      expenseId,
      expenseData,
      { new: true }
    );

    return new Response(
      JSON.stringify({
        message: "✅ Expense Updated Successfully",
        updatedProduct: updatedProduct,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating expense:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to update expense",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const { expenseId } = await params;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    return new Response(
      JSON.stringify({
        message: "✅ Expense deleted successfully",
        deletedExpense: deletedExpense,
      }),
      {
        status: 201,
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error deleting expense:", error);
    return new Response(
      JSON.stringify({
        message: "❌ Error deleting expense",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
