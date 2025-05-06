"use client";

import { useRouter } from "next/navigation";

export default function AnalyticsCard({
  Icon,
  children,
  totalQuantity,
  totalAmount,
  loading,
  orderStatus = "",
  queryParams,
}) {
  const router = useRouter();
  return (
    <a
      href={
        orderStatus
          ? `analytics/${orderStatus+queryParams}`
          : `/entries/customer/all${queryParams}`
      }
      className="flex flex-col gap-6 border p-5 rounded-md"
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-600 p-2 rounded-full w-fit bg-blue-200">
          <Icon size={20} />
        </div>
        <p className="text-xl">{children}</p>
      </div>
      <div className="flex items-center justify-between">
        <strong>{loading ? "Loading" : totalQuantity}</strong>
        <strong>{loading ? "Loading" : `${totalAmount} BDT`}</strong>
      </div>
    </a>
  );
}
