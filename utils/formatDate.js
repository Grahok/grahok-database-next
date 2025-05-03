import { format } from "date-fns";

export default function formatDate(dateStr) {
  const date = new Date(dateStr);
  const correctDate = date.setTime(date.getTime() - 6 * 60 * 60 * 1000);
  return format(date, "dd/MM/yyyy");
}
