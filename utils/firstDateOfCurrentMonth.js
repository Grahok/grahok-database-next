import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
export default function firstDateOfCurrentMonth(dateStr) {
  if (!dateStr) {
    return;
  } else {
    dayjs.extend(utc);
    const output = dayjs.utc(dateStr).local().format("YYYY-MM-01");
    return output;
  }
}
