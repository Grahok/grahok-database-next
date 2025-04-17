const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

export async function fetchEntries() {
  const response = await fetch(`${baseUrl}/api/entries/vendor`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // ensure fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }

  return response.json();
}

export async function deleteEntry(entryId) {
  const response = await fetch(`${baseUrl}/api/entries`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: entryId }), // 🔁 fixed key to _id
  });

  if (!response.ok) {
    throw new Error("Failed to delete entry");
  }

  return response.json();
}

export async function fetchEntry(customerId) {
  const response = await fetch(`${baseUrl}/api/entries/customer/${customerId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // ensure fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch entry");
  }

  return response.json();
}
