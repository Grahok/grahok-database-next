export default async function deleteExpense(expenseId) {
    const response = await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenseId),
    });
  
    return response;
  }
  