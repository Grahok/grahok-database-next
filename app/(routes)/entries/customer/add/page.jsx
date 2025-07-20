"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SHIPPING_METHODS } from "@/constants/shippingMethods";

const customerSchema = z.object({
  name: z.string().min(1),
  mobileNumber: z.string().regex(/^01.{9}$/),
  address: z.string().min(1),
});

const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  inStock: z.number(),
  purchasePrice: z.coerce().number().nonnegative(),
  sellPrice: z.coerce().number().nonnegative(),
});

const productSchemaExtended = z.object({
  product: productSchema._id,
  purchasePrice: productSchema.purchasePrice,
  sellPrice: productSchema.sellPrice,
  quantity: z.coerce().number().min(1),
  discount: z.coerce().number().nonnegative(),
});

const customerEntrySchema = z.object({
  customer: customerSchema,
  orderDate: z.date(),
  entryDate: z.date(),
  paymentDate: z.date(),
  products: z.array(productSchema).min(1, {
    message: "Add at least one product",
  }),
  shippingCustomer: z.coerce().number().nonnegative(),
  shippingMerchant: z.coerce().number().nonnegative(),
  shippingMethod: z.enum(SHIPPING_METHODS),
  otherCost: z.coerce().number().nonnegative(),
  courierTax: z.coerce().number().nonnegative(),
  overallDiscount: z.coerce().number().nonnegative(),
  note: z.string(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(customerEntrySchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
