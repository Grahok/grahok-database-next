// @/components/ConfirmDialog.jsx
"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";

const ConfirmDialog = forwardRef(({ onConfirm, message = "Are you sure?" }, ref) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  return (
    <dialog ref={dialogRef} className="rounded-md p-4 shadow-lg w-full max-w-sm border border-gray-300">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={() => dialogRef.current.close()}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => {
            onConfirm();
            dialogRef.current.close();
          }}
        >
          Delete
        </button>
      </div>
    </dialog>
  );
});

export default ConfirmDialog;
