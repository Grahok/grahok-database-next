export async function getVendor(vendorId) {
  const response = await fetch(`/api/vendors/${vendorId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch vendor");
  }

  return response;
}

export async function updateVendor(vendorId, vendorData) {
  const response = await fetch(`/api/vendors/${vendorId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vendorData),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update vendor");
  }

  return response;
}
