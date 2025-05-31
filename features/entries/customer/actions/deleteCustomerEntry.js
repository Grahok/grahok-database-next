export default async function deleteCustomerEntry(entryId) {
  const response = await fetch(`/api/entries/customer/${entryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
