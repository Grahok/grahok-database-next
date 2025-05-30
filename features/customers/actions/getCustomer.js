export async function getCustomer(customerId) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch customer");
  }

  return response;
}