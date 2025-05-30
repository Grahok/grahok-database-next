export default async function fetchExpenses(searchParams = "") {
  const response = await fetch(`/api/expenses?${searchParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
