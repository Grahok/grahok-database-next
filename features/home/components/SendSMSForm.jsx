"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import courierNames from "@/constants/courierNames";
import { toast } from "sonner";

export default function SendSMSForm() {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));

        const response = await fetch("/api/send-parcel-tracking-message", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        });

        const { success, message } = await response.json();

        toast.success(message);
      }}
    >
      <div className="flex items-end gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="courierName">Courier Name</Label>
          <Select id="courierName" name="courierName">
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select a courier..." />
            </SelectTrigger>
            <SelectContent>
              {courierNames.map((courier, index) => (
                <SelectItem key={index} value={courier.value}>
                  {courier.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Mobile Number</Label>
          <Input id="mobileNumber" type="text" name="mobileNumber" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Tracking Link</Label>
        <Input id="trackingLink" type="text" name="trackingLink" />
      </div>
      <div className="flex gap-2 justify-end items-center">
        <DialogClose asChild>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}
