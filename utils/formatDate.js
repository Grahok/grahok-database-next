import { format } from "date-fns";

export default function formatDate(dateStr) {
  if (!dateStr) {
    return;
  } else {
    const date = new Date(dateStr);
    return format(date, "dd/MM/yyyy");
  }
}
