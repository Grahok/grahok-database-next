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

export async function GET(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const fromDate = url.searchParams.get("fromDate");
    const toDate = url.searchParams.get("toDate");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const name = url.searchParams.get("name") || "Facebook Payment";
    const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage")) || 0;

    const query = {};

    if (fromDate && toDate) {
      query.date = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    if (name) {
      query.name = name;
    }
    // Count total entries matching the query
    const totalExpenses = await Expense.countDocuments(query);
    const totalPages = Math.ceil(totalExpenses / itemsPerPage) || 1;

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return new Response(
      JSON.stringify({
        message: "✅ Expenses fetched successfully",
        expenses: expenses,
        pagination: {
          totalExpenses: totalExpenses,
          totalPages,
        },
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
