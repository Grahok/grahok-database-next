import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AddVendorPaymentForm({children, entry, onSubmit}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="p-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-200">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 *:flex *:flex-col *:gap-1"
          onSubmit={onSubmit}
        >
          <div>
            <Label htmlFor="invoiceNumber" className="font-semibold">
              Invoice Number
            </Label>
            <Input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              defaultValue={entry?.invoiceNumber}
              disabled={entry}
              required
            />
          </div>
          <div>
            <Label htmlFor="paymentDate" className="font-semibold">
              Payment Date
            </Label>
            <Input type="date" id="paymentDate" name="paymentDate" required />
          </div>
          <div>
            <Label htmlFor="amount" className="font-semibold">
              Amount
            </Label>
            <Input type="number" id="amount" name="amount" required autoFocus={entry} />
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer">
              Add Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
