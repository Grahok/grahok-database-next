import { format } from "date-fns";

export default function inputDateFormat(date) {
  return format(date, "yyyy-MM-dd");
}
