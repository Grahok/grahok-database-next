"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import orderConfirmedSMS from "@/constants/orderConfirmedSMS";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SendSMSForm() {
  const [customerName, setCustomerName] = useState("");
  const [messageBodyIsEditable, setMessageBodyIsEditable] = useState(false);
  const [messageBody, setMessageBody] = useState(orderConfirmedSMS(""));

  useEffect(() => {
    if (!messageBodyIsEditable) {
      setMessageBody(orderConfirmedSMS(customerName));
    }
  }, [customerName, messageBodyIsEditable]);

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        const response = await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        });

        const { success, message } = await response.json();

        if (success == 1) {
          toast.success(message);
        } else if (success == 0) {
          toast.error(message);
        }
      }}
    >
      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input id="mobileNumber" type="text" name="mobileNumber" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            type="text"
            name="customerName"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Label>Message Body</Label>
          <div className="flex items-center gap-2">
            <Label htmlFor="editMessageBody">Edit</Label>
            <Switch
              id="editMessageBody"
              checked={messageBodyIsEditable}
              onCheckedChange={setMessageBodyIsEditable}
            />
          </div>
        </div>
        <Textarea
          id="messageBody"
          type="text"
          name="messageBody"
          value={messageBody}
          onChange={
            messageBodyIsEditable
              ? (e) => setMessageBody(e.target.value)
              : undefined
          }
          disabled={!messageBodyIsEditable}
          required
        />
        {!messageBodyIsEditable && (
          <textarea hidden name="messageBody" value={messageBody} readOnly />
        )}
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
