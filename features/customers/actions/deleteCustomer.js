export default async function deleteCustomer(customerId) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to delete customer");
  }

  return response;
}
