const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

export async function fetchEntries(customerId) {
  const response = await fetch(
    `${baseUrl}/api/entries/customer/${customerId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // ensure fresh data
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }

  const entries = await response.json();
  return entries.map((entry) => ({
    ...entry,
    status: entry.status || "Unknown",
  }));
}
