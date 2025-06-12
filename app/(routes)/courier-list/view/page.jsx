"use client"

import fetchCourierLists from "@/features/courier-list/actions/fetchCourierLists";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useEffect, useState } from "react";

export default function ViewCourierInfo() {
  const [courierInfo, setCourierInfo] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchCourierLists();
        const { courierInfo } = await response.json();
        setCourierInfo(courierInfo);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">View Courier Info</h1>
      <DataTable columns={columns} data={courierInfo} />
    </div>
  );
}