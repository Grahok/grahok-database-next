"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { use, useEffect } from "react";
import { toast } from "sonner";
import fetchCustomer from "@/features/customers/actions/fetchCustomer";
import updateCustomer from "@/features/customers/actions/updateCustomer";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  mobileNumber: z
    .string()
    .length(11)
    .regex(/^01.{9}$/),
  address: z.string(),
});

export default function EditCustomerForm({ params }) {
  const { customerId } = use(params);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Loading...",
      mobileNumber: "Loading...",
      address: "Loading...",
    },
  });

  useEffect(() => {
    (async () => {
      const customer = await fetchCustomer(customerId);
      form.reset({
        name: customer?.name ?? "",
        mobileNumber: customer?.mobileNumber ?? "",
        address: customer?.address ?? "",
      });
    })();
  }, []);

  async function onSubmit(values) {
    const { success } = await updateCustomer(customerId, values);
    if (success) {
      toast.success("Customer updated successfully");
      router.back();
    } else {
      toast.error("Failed to update customer");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-3xl font-bold">Edit Customer</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input type="string" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
