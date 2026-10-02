export default async function fetchVendors() {
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