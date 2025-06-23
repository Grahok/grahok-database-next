"use server"

import baseUrl from "@/constants/baseUrl";

export default async function fetchCustomers() {
  const response = await fetch(`${baseUrl}/api/customers`);
  return response;
}
