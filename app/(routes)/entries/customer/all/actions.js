export async function fetchEntries() {
  const response = await fetch("/api/entries/customer", {
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
  const response = await fetch(`/api/entries/customer/${entryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to delete entry");
  }

  return response;
}

export async function fetchEntry(customerId) {
  const response = await fetch(`/api/entries/customer/${customerId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch entry");
  }

  return response;
}
