"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export default function FraudChecker() {
  const [courierData, setCourierData] = useState([]);
  async function getCourierRecords(e) {
    e.preventDefault();
    const phone = e.target.mobileNumber.value;
    const response = await fetch(`https://bdcourier.com/api/courier-check`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BDCOURIER_TOKEN}`,
      },
      body: JSON.stringify({ phone }),
    });

    let { courierData } = await response.json();
    setCourierData(Object.values(courierData));
  }
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold">Fraud Checker</h1>
      </header>
      <main className="flex flex-col gap-6">
        <form onSubmit={getCourierRecords}>
          <div className="flex items-stretch max-w-80">
            <Input
              className="rounded-r-none"
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="013XXXXXXXX"
            />
            <Button type="submit" className="rounded-l-none">
              Submit
            </Button>
          </div>
        </form>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Courier</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Success</TableHead>
                <TableHead>Cancelled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courierData.map((courier, index) => (
                <TableRow key={index}>
                  {courier?.logo ? (
                    <TableCell>
                      <img
                        src={courier?.logo}
                        alt={courier?.name}
                        className="max-w-40"
                      />
                    </TableCell>
                  ) : (
                    <TableHead className="font-bold">Total</TableHead>
                  )}
                  <TableCell>{courier?.total_parcel}</TableCell>
                  <TableCell>{courier?.success_parcel}</TableCell>
                  <TableCell>{courier?.cancelled_parcel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
}
