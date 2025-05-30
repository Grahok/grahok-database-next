export default async function fetchVendorEntry(entryId) {
  const response = await fetch(`/api/entries/vendor/${entryId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  });

  return response;
}
