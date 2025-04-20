export async function fetchVendors() {
  const response = await fetch("/api/vendors", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return response;
}

export async function deleteVendor(vendorId) {
  const response = await fetch("/api/vendors", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: vendorId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete vendor");
  }

  return response;
}
