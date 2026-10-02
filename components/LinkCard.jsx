import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRightFromSquare } from "lucide-react";

export default function LinkCard({ title, url, icon: Icon }) {
  return (
    <Card className="p-0 text-nowrap w-full">
      <a href={url} className="px-6 py-6 block">
        <CardContent className="p-0 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <Icon className="w-5 h-5 shrink-0" />
            {title}
          </span>
          <ArrowUpRightFromSquare className="w-4 h-4 shrink-0" />
        </CardContent>
      </a>
    </Card>
  );
}
