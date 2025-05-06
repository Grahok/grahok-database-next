import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
export default function inputDateFormat(dateStr) {
  if (!dateStr) {
    return;
  } else {
    dayjs.extend(utc);
    const output = dayjs.utc(dateStr).local().format("YYYY-MM-DD");
    return output;
  }
}
