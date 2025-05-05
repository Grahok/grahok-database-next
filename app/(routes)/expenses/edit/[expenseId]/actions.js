export async function getExpense(expenseId) {
  const response = await fetch(`/api/expenses/${expenseId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch expense");
  }

  return response;
}

export async function updateExpense(expenseId, expenseData) {
  const response = await fetch(`/api/expenses/${expenseId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update expense");
  }

  return response;
}
