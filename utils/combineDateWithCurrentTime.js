export default function combineDateWithCurrentTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();

  date.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  date.setTime(date.getTime() + 6 * 60 * 60 * 1000);
  console.log(date.toString());
  return date.toISOString();
}
