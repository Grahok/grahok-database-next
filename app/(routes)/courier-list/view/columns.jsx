"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import deleteCustomer from "@/features/customers/actions/deleteCustomer";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select One"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ table, row }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      const pageRows = table.getPaginationRowModel().rows;
      const rowIndex = pageRows.findIndex((r) => r.id === row.id);
      return pageIndex * pageSize + rowIndex + 1;
    },
    enableGlobalFilter: false,
    enableHiding: false,
  },
  {
    accessorKey: "courierName",
    id: "courierName",
    header: "Courier Name",
    enableHiding: false,
  },
  {
    accessorKey: "branchName",
    id: "branchName",
    header: "Branch Name",
  },
  {
    accessorKey: "branchId",
    id: "branchId",
    header: "Branch Id",
  },
  {
    accessorKey: "branchCode",
    id: "branchCode",
    header: "Branch Code",
  },
  {
    accessorKey: "address.division",
    id: "division",
    header: "Division",
    enableHiding: true,
  },
  {
    accessorKey: "address.district",
    id: "district",
    header: "District",
    enableHiding: true,
  },
  {
    accessorKey: "address.upazilla",
    id: "upazilla",
    header: "Upazilla",
    enableHiding: true,
  },
  {
    accessorKey: "address.location",
    id: "location",
    header: "Location",
  },
  {
    accessorKey: "mobileNumber",
    id: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "courierCondition",
    id: "courierCondition",
    header: "Courier Condition",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <>
          <div className="flex items-center justify-self-center gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              asChild
            >
              <Link href={`/customers/view/${customer._id}`}>
                <EyeIcon />
              </Link>
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
              asChild
            >
              <Link href={`/customers/edit/${customer._id}`}>
                <PencilIcon />
              </Link>
            </Button>
            <ConfirmDialog
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              label="Delete"
              message="Are you sure to delete this customer?"
              onConfirm={() => deleteCustomer(customer._id)}
            >
              <TrashIcon />
            </ConfirmDialog>
          </div>
        </>
      );
    },
  },
];
