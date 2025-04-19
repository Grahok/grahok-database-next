export async function getCustomers() {
  const response = await fetch("/api/customers", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch customers");
  }

  return response;
}

export async function deleteCustomer(customerId) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to delete customer");
  }

  return response;
}
