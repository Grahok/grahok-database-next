"use client";

import { PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ConfirmDialog from "@/components/ConfirmDialog";
import DataTableColumnHeader from "@/components/DataTableColumnHeader";
import deleteProduct from "@/features/products/actions/deleteProduct";
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
        aria-label="Select product"
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "purchasePrice",
    header: "Purchase Price",
  },
  {
    accessorKey: "sellPrice",
    header: "Sell Price",
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          <div className="flex items-center justify-self-center gap-2">
            <Button
              size="icon"
              className="size-7 bg-green-600 hover:bg-green-700"
              asChild
            >
              <a href={`/products/edit/${product._id}`}>
                <PencilIcon />
              </a>
            </Button>
            <ConfirmDialog
              variant="destructive"
              label="Delete"
              message="Are you sure to delete this product?"
              onConfirm={async () => {
                const success = await deleteProduct(product._id);
                if (success) {
                  toast.warning("Product deleted successfully");
                } else {
                  toast.error("Failed to delete product");
                }
              }}
            >
              <TrashIcon />
            </ConfirmDialog>
          </div>
        </>
      );
    },
  },
];
