export default async function getExpenses(searchParams = "") {
  const response = await fetch(`/api/expenses?${searchParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
