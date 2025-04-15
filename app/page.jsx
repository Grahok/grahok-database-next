import {
  FaBoxesStacked,
  FaCirclePlus,
  FaDatabase,
  FaUpRightFromSquare,
  FaUser,
  FaUserPlus,
} from "react-icons/fa6";

export default function Home() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      <a
        href="/entries/all"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaDatabase className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">All Entries</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/entries/add"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaCirclePlus className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">Add Entry</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/customers/all"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaUser className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">All Customers</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/customers/add"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaUserPlus className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">Add Customer</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/vendors/all"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaUser className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">All Vendors</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/vendors/add"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaUserPlus className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">Add Vendor</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/products/all"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaBoxesStacked className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">All Products</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
      <a
        href="/products/add"
        className="flex items-center justify-between gap-3 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition group h-20"
      >
        <div className="flex items-center gap-3 flex-1">
          <FaCirclePlus className="size-5 flex-shrink-0" />
          <p className="whitespace-normal leading-tight">Add Product</p>
        </div>
        <FaUpRightFromSquare className="hidden group-hover:block transition-transform duration-300 ease-in-out size-5 flex-shrink-0" />
      </a>
    </section>
  );
}
