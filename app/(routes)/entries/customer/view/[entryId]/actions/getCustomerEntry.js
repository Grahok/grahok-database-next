export async function getCustomerEntry(entryId) {
    const response = await fetch(`/api/entries/customer/${entryId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch entry");
    }
  
    return response;
  }
  