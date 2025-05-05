export default async function deleteExpense(expenseId) {
  const response = await fetch(`/api/expenses/${expenseId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
