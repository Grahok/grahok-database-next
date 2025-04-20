import { format } from "date-fns";

export default function formatDate(date) {
  return format(date, "MM/dd/yyyy");
}
