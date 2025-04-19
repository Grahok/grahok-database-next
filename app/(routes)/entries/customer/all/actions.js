export async function fetchEntries() {
  const response = await fetch("/api/entries/customer", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return response;
}

export async function deleteEntry(entryId) {
  const response = await fetch(`/api/entries/customer/${entryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response;
}

export async function fetchEntry(entryId) {
  const response = await fetch(`/api/entries/customer/${entryId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  });

  return response;
}
