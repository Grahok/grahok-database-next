export default async function getExpenses() {
  const response = await fetch("/api/expenses", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
