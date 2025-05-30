export default async function fetchEntriesByVendor(vendorId) {
  const response = await fetch(`/api/entries/vendor/${vendorId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return response;
}
