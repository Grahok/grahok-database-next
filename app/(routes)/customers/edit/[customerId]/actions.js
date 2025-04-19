export async function getCustomer(customerId) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch customer");
  }

  return response;
}

export async function updateCustomer(customerId) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update customer");
  }

  return response;
}
