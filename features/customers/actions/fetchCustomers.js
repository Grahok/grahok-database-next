import baseUrl from "@/constants/baseUrl";

export default async function fetchCustomers(searchParams = "") {
  const response = await fetch(`${baseUrl}/api/customers${searchParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch customers");
  }

  return response;
}
