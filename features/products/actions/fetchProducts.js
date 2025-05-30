export default async function fetchProducts(searchParams = "") {
  const response = await fetch(`/api/products${searchParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response;
}