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
import fetchProduct from "@/features/products/actions/fetchProduct";
import updateProduct from "@/features/products/actions/updateProduct";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
  purchasePrice: z.coerce.number().nonnegative(),
  sellPrice: z.coerce.number().nonnegative(),
  inStock: z.coerce.number().nonnegative(),
});

export default function EditProductForm({ params }) {
  const { productId } = use(params);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Loading...",
      purchasePrice: 0,
      sellPrice: 0,
      inStock: 0,
    },
  });

  useEffect(() => {
    (async () => {
      const product = await fetchProduct(productId);
      form.reset({
        name: product?.name ?? "",
        purchasePrice: product?.purchasePrice ?? 0,
        sellPrice: product?.sellPrice ?? 0,
        inStock: product?.inStock ?? 0,
      });
    })();
  }, []);

  async function onSubmit(values) {
    const { success } = await updateProduct(productId, values);
    if (success) {
      toast.success("Product updated successfully");
    } else {
      toast.error("Failed to update product");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Product</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sellPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sell Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>In Stock</FormLabel>
              <FormControl>
                <Input type="number" step={0.25} {...field} />
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
