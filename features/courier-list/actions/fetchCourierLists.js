import baseUrl from "@/constants/baseUrl";

export default async function fetchCourierLists() {
  const response = await fetch(`${baseUrl}/api/courierInfo`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  });
  return response;
}
