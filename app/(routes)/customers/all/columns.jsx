"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import formatDate from "@/utils/formatDate";
import ConfirmDialog from "@/components/ConfirmDialog";
import deleteCustomer from "@/features/customers/actions/deleteCustomer";
import DataTableColumnHeader from "@/components/DataTableColumnHeader";
import { toast } from "sonner";

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
    enableHiding: false,
  },
  {
    accessorKey: "entryDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Entry Date" />;
    },
    cell: ({ row }) => {
      const entryDate = row.getValue("entryDate");
      const formatted = formatDate(entryDate);

      return formatted;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <div className="flex items-center justify-self-center gap-2">
          <Button
            size="icon"
            className="size-7 bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <a
              href={`/customers/view/${customer._id}`}
              aria-label="View customer"
            >
              <EyeIcon aria-hidden="true" />
              <span className="sr-only">View</span>
            </a>
          </Button>
          <Button
            size="icon"
            className="size-7 bg-green-600 hover:bg-green-700"
            asChild
          >
            <a
              href={`/customers/edit/${customer._id}`}
              aria-label="Edit customer"
            >
              <PencilIcon aria-hidden="true" />
            </a>
          </Button>
          <ConfirmDialog
            variant="destructive"
            label="Delete"
            message="Are you sure to delete this customer?"
            onConfirm={async () => {
              const success = await deleteCustomer(customer._id);
              if (success) {
                toast.warning("Customer deleted successfully");
              } else {
                toast.error("Failed to delete customer");
              }
            }}
          >
            <TrashIcon aria-hidden="true" />
            <span className="sr-only">Delete</span>
          </ConfirmDialog>
        </div>
      );
    },
  },
];
