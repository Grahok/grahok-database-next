export async function fetchEntries(customerId) {
  const response = await fetch(
    `/api/entries/customer/byCustomer/${customerId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  return response;
}
