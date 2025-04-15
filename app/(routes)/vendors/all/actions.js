const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

export async function fetchVendors() {
  const response = await fetch(`${baseUrl}/api/vendors`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // ensure fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return response.json();
}

export async function deleteVendor(vendorId) {
  const response = await fetch(`${baseUrl}/api/vendors`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: vendorId }), // 🔁 fixed key to _id
  });

  if (!response.ok) {
    throw new Error("Failed to delete vendor");
  }

  return response.json();
}
