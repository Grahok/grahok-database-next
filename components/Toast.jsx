import { XIcon } from "lucide-react";
import { FaCheck, FaXmark } from "react-icons/fa6";

const Toast = ({ message = "Action executed successfully.", show = false, onClose, type = "success" }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 bg-white text-gray-800 shadow-lg rounded-lg px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2">
        {type == "success" ? (
          <FaCheck className="text-green-500" />
        ) : type == "error" ? (
          <XIcon className="text-red-500" />
        ) : null}
        <span>{message}</span>
      </div>

      <button
        className="text-gray-500 hover:text-gray-700"
        type="button"
        onClick={onClose}
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default Toast;
