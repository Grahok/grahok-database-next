// @/components/ConfirmDialog.jsx
"use client";

import { useRef } from "react";

export default function ConfirmDialog({
  onConfirm,
  message,
  label = "Confirm",
  children,
  className,
}) {
  const dialogRef = useRef();

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => dialogRef.current?.showModal()}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        className="rounded-md p-6 shadow-lg border border-gray-300 m-auto backdrop:bg-gray-950/20 space-y-3 text-start"
      >
        <h4 className="font-medium text-xl">Are you sure?</h4>
        {message && <p>{message}</p>}
        <div className="w-full flex justify-start gap-2">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
            onClick={() => {
              onConfirm();
              dialogRef.current.close();
            }}
          >
            {label}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400/60 px-3 py-1 rounded cursor-pointer"
            onClick={() => dialogRef.current.close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
