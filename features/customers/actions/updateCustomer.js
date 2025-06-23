import { toast } from "sonner";

export default async function updateCustomer(customerId, customerData) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });

  if (response.ok) {
    toast.success(`Customer updated successfully (${response.status})`);
  } else {
    toast.success(`Failed to update customer (${response.status})`);
  }

  return response;
}
