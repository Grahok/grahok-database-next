"use client";

import { Suspense } from "react";
import Analytics from "./components/Analytics";

export default function AnalyticsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Analytics />
    </Suspense>
  );
}
