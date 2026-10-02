import { useEffect } from "react";

export default function useEnterNavigation({ autoSubmit = false } = {}) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== "Enter") return;

      const target = e.target;
      if (!target || !(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;

      // Allow default in textarea
      if (target.tagName === "TEXTAREA") return;

      e.preventDefault();

      const form = target.closest("form");
      const focusable = Array.from(
        form?.querySelectorAll(
          'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
        ) || []
      ).filter(el => el.tabIndex !== -1);

      const index = focusable.indexOf(target);
      const next = focusable[index + 1];

      if (next) {
        next.focus();
      } else if (autoSubmit && form) {
        form.requestSubmit?.();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [autoSubmit]);
}
