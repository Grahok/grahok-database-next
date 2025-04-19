export async function fetchEntries(vendorId) {
  const response = await fetch(`/api/entries/vendor/${vendorId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // ensure fresh data
  });

  return response;
}
