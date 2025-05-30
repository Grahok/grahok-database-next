export default async function fetchCustomerEntries(searchParams = "") {
  const response = await fetch(`/api/entries/customer${searchParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return response;
}