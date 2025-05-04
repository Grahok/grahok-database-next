"use client";

import { useEffect, useState } from "react";
import AnalyticsCard from "@/features/analytics/components/AnalyticsCard";
import {
  FaBox,
  FaBoxOpen,
  FaCheck,
  FaClock,
  FaTruckArrowRight,
  FaXmark,
} from "react-icons/fa6";
import { ORDER_STATUSES } from "@/constants/orderStatuses";
import inputDateFormat from "@/utils/inputDateFormat";
import firstDateOfCurrentMonth from "@/utils/firstDateOfCurrentMonth";
import { useSearchParams } from "next/navigation";
import { fetchEntries } from "../../entries/customer/all/components/actions";

export default function Analytics() {
  const searchParams = useSearchParams();
  const fromDateParam =
    searchParams.get("fromDate") ||
    firstDateOfCurrentMonth(new Date(Date.now()));
  const toDateParam =
    searchParams.get("toDate") || inputDateFormat(new Date(Date.now()));
  const query =
    searchParams.toString() ||
    `fromDate=${fromDateParam}&toDate=${toDateParam}`;
  const queryParams = `?${query}`;
  const [loading, setLoading] = useState(true);
  const [statusEntries, setStatusEntries] = useState({});
  const [statusTotals, setStatusTotals] = useState({});
  const [totalObj, setTotalObj] = useState({
    totalCount: 0,
    totalPaidByCustomer: 0,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetchEntries(queryParams);
        const { entries } = await response.json();
        const statusEntriesTemp = {};
        const statusTotalsTemp = {};

        ORDER_STATUSES.forEach((status) => {
          const filtered = entries.filter((e) => e.orderStatus === status);
          statusEntriesTemp[status] = filtered;
          statusTotalsTemp[status] = {
            totalCount: filtered.length,
            totalPaidByCustomer: filtered.reduce(
              (acc, e) => acc + e.paidByCustomer,
              0
            ),
          };
        });

        setStatusEntries(statusEntriesTemp);
        setStatusTotals(statusTotalsTemp);

        setTotalObj({
          totalCount: entries.length,
          totalPaidByCustomer: entries.reduce(
            (acc, e) => acc + e.paidByCustomer,
            0
          ),
        });
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  return (
    <section className="w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <form className="flex flex-col md:flex-row items-start md:items-end gap-4 rounded-lg w-full max-w-2xl">
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="fromDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            From
          </label>
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="date"
            name="fromDate"
            id="fromDate"
            defaultValue={fromDateParam}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="toDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            To
          </label>
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="date"
            name="toDate"
            id="toDate"
            defaultValue={toDateParam}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition w-full md:w-auto"
        >
          Load
        </button>
      </form>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-3">
        <AnalyticsCard
          Icon={FaBox}
          totalQuantity={totalObj.totalCount}
          totalAmount={totalObj.totalPaidByCustomer}
          loading={loading}
        >
          Total Parcels
        </AnalyticsCard>
        <AnalyticsCard
          Icon={FaClock}
          totalQuantity={statusTotals.Pending?.totalCount || 0}
          totalAmount={statusTotals.Pending?.totalPaidByCustomer || 0}
          loading={loading}
          orderStatus="Pending"
        >
          Pending
        </AnalyticsCard>
        <AnalyticsCard
          Icon={FaCheck}
          totalQuantity={statusTotals.Confirmed?.totalCount || 0}
          totalAmount={statusTotals.Confirmed?.totalPaidByCustomer || 0}
          loading={loading}
          orderStatus="Confirmed"
        >
          Confirmed
        </AnalyticsCard>
        <AnalyticsCard
          Icon={FaXmark}
          totalQuantity={statusTotals.Cancelled?.totalCount || 0}
          totalAmount={statusTotals.Cancelled?.totalPaidByCustomer || 0}
          loading={loading}
          orderStatus="Cancelled"
        >
          Cancelled
        </AnalyticsCard>
        <AnalyticsCard
          Icon={FaTruckArrowRight}
          totalQuantity={statusTotals.Shipped?.totalCount || 0}
          totalAmount={statusTotals.Shipped?.totalPaidByCustomer || 0}
          loading={loading}
          orderStatus="Shipped"
        >
          Shipped
        </AnalyticsCard>
        <AnalyticsCard
          Icon={FaBoxOpen}
          totalQuantity={statusTotals.Delivered?.totalCount || 0}
          totalAmount={statusTotals.Delivered?.totalPaidByCustomer || 0}
          loading={loading}
          orderStatus="Delivered"
        >
          Delivered
        </AnalyticsCard>
      </div>
    </section>
  );
}
