export default async function fetchVendor(vendorId) {
  const response = await fetch(`/api/vendors/${vendorId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch vendor");
  }

  return response;
}