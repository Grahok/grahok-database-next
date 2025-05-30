export async function deleteEntry(entryId) {
  const response = await fetch(`/api/entries/customer/${entryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}