export default async function fetchCustomers(searchParams = "") {
  const response = await fetch(`/api/customers${searchParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch customers");
  }

  return response;
}
