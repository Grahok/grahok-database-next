export async function updateCustomer(customerId, customerData) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update customer");
  }

  return response;
}
