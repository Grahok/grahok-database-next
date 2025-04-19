export async function fetchEntries(customerId) {
  const response = await fetch(
    `/api/entries/customer/${customerId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // ensure fresh data
    }
  );

  return response;
}
