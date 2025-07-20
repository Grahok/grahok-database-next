"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

export default function ConfirmDialog({
  onConfirm,
  message,
  label = "Confirm",
  children,
  className,
  variant = "destructive",
  ...props
}) {
  const router = useRouter();
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button
          className={cn("size-7 cursor-pointer", className)}
          size="icon"
          variant={variant}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          {message && <DialogDescription>{message}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              aria-label={label || "Confirm action"}
              onClick={() => {
                onConfirm();
                router.refresh();
              }}
              variant={variant}
            >
              {label}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
