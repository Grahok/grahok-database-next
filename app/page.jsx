import {
  HomeIcon,
  DatabaseIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserIcon,
  BadgeDollarSignIcon,
  DollarSignIcon,
  ShieldIcon,
  ListIcon,
  BoxesIcon,
  BoxIcon,
} from "lucide-react";
import LinkCard from "@/components/LinkCard";

export default function Home() {
  const items = [
    {
      title: "All Customer Entries",
      url: "/entries/customer/all",
      icon: DatabaseIcon,
    },
    {
      title: "Add Customer Entry",
      url: "/entries/customer/add",
      icon: ShoppingCartIcon,
    },
    {
      title: "All Vendor Entries",
      url: "/entries/vendor/all",
      icon: DatabaseIcon,
    },
    {
      title: "Add Vendor Entry",
      url: "/entries/vendor/add",
      icon: ShoppingCartIcon,
    },
    {
      title: "All Customers",
      url: "/customers/all",
      icon: UsersIcon,
    },
    {
      title: "Add Customer",
      url: "/customers/add",
      icon: UserIcon,
    },
    {
      title: "All Vendors",
      url: "/vendors/all",
      icon: UsersIcon,
    },
    {
      title: "Add Vendor",
      url: "/vendors/add",
      icon: UserIcon,
    },
    {
      title: "All Products",
      url: "/products/all",
      icon: BoxesIcon,
    },
    {
      title: "Add Product",
      url: "/product/add",
      icon: BoxIcon,
    },
    {
      title: "All Expenses",
      url: "/expenses/all",
      icon: BadgeDollarSignIcon,
    },
    {
      title: "Add Expense",
      url: "/expenses/add",
      icon: DollarSignIcon,
    },
    {
      title: "Fraud Checker",
      url: "/fraud-checker",
      icon: ShieldIcon,
    },
    {
      title: "Courier List",
      url: "/courier-list",
      icon: ListIcon,
    },
  ];

  return (
    <section className="flex flex-col justify-between gap-6 grow">
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
      <strong className="text-right">
        Created for 💵 by Shakil Ahmmed | Chitti V3.1
      </strong>
    </section>
  );
}
