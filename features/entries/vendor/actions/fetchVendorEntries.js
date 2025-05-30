export default async function fetchVendorEntries() {
  const response = await fetch("/api/entries/vendor", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return response;
}