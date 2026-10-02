import Analytics from "@/features/analytics/components/Analytics";
import { Suspense } from "react";

export default function AnalyticsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Analytics />
    </Suspense>
  );
}
