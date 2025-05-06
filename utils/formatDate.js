import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
export default function formatDate(dateStr) {
  if (!dateStr) {
    return;
  } else {
    dayjs.extend(utc);
    const output = dayjs.utc(dateStr).local().format("DD/MM/YYYY");
    return output;
  }
}
