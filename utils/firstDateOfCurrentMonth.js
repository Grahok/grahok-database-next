import { format } from "date-fns";

export default function firstDateOfCurrentMonth(date) {
  return format(date, "yyyy-MM-01");
}
