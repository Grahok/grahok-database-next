export default async function fetchEntry(entryId) {
  const response = await fetch(`/api/entries/customer/${entryId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  });

  return response;
}
