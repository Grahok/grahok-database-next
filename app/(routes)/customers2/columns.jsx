"use client";

import { ArrowUpDown, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import formatDate from "@/utils/formatDate";
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
        aria-label="Select customer"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "entryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entry Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const entryDate = row.getValue("entryDate");
      const formatted = formatDate(entryDate);

      return formatted;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
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
