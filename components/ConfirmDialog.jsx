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
  variant,
  ...props
}) {
  const router = useRouter();
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button className={cn("size-7 cursor-pointer", className)} size="icon" variant={variant}>{children}</Button>
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
              onClick={() => {
                onConfirm();
                router.refresh();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
            >
              {label}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
