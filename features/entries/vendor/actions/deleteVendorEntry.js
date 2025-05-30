export default async function deleteEntry(entryId) {
  const response = await fetch(`/api/entries/vendor/${entryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
