export async function fetchEntries() {
  const response = await fetch("/api/entries/vendor", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  
  return response;
}

export async function deleteEntry(entryId) {
  const response = await fetch("/api/entries", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: entryId }), // 🔁 fixed key to _id
  });

  if (!response.ok) {
    throw new Error("Failed to delete entry");
  }

  return response;
}

export async function fetchEntry(vendorId) {
  const response = await fetch(
    `/api/entries/vendor/${vendorId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch entry");
  }

  return response;
}
