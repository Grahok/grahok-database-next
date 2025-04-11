const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

export async function fetchCustomers() {
  const response = await fetch(`${baseUrl}/api/customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // ensure fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function deleteCustomer(customerId) {
  const response = await fetch(`${baseUrl}/api/customers`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: customerId }), // 🔁 fixed key to _id
  });

  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }

  return response.json();
}
