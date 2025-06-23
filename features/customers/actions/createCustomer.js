import { toast } from "sonner";

export default async function createCustomer(customerData) {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });

  if (response.ok) {
    toast.success(`Custommer added successfully (${response.status})`);
  } else {
    toast.error(`Failed to add customer (${response.status})`);
  }

  return response;
}
