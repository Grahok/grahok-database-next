export async function getProduct(productId) {
  const response = await fetch(`/api/products/${productId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch product");
  }

  return response;
}

export async function updateProduct(productId) {
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update product");
  }

  return response;
}
