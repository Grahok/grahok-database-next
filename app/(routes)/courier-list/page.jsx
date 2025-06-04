import LinkCard from "@/components/LinkCard";
import { DatabaseIcon, ShoppingCartIcon } from "lucide-react";

export default function CourierList() {
  const items = [
    {
      title: "View Courier Info",
      url: "/courier-list/view",
      icon: DatabaseIcon,
    },
    {
      title: "Add Courier Info",
      url: "/courier-list/add",
      icon: ShoppingCartIcon,
    },
    {
      title: "All Courier Info",
      url: "/courier-list/all",
      icon: DatabaseIcon,
    },
  ];
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Courier List</h1>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        {items.map((item, index) => (
          <LinkCard
            key={index}
            title={item.title}
            url={item.url}
            icon={item.icon}
          />
        ))}
      </section>
    </section>
  );
}
