import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function ToastConfirmation({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md max-w-sm flex items-center space-x-4">
      <p className="text-gray-800 flex-grow">{message}</p>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <FaTimes />
      </button>
    </div>
  );
};
