import { FaChevronDown } from "react-icons/fa6";

export default function Test() {
  return (
    <li>
      <input type="checkbox" id="submenutrigger" className="peer hidden" />
      <label
        htmlFor="submenutrigger"
        className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-200 rounded"
      >
        <span>Entries</span>
        <FaChevronDown className="text-gray-500" />
      </label>

      <ul className="hidden peer-checked:flex pl-6 flex-col gap-2">
        <li className="hover:underline cursor-pointer">Submenu 1</li>
        <li className="hover:underline cursor-pointer">Submenu 2</li>
        <li className="hover:underline cursor-pointer">Submenu 3</li>
        <li className="hover:underline cursor-pointer">Submenu 4</li>
        <li className="hover:underline cursor-pointer">Submenu 5</li>
      </ul>
    </li>
  );
}
