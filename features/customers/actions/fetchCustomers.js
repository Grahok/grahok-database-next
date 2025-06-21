import baseUrl from "@/constants/baseUrl";

export default async function fetchCustomers() {
  const response = await fetch(`${baseUrl}/api/customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return response;
}
