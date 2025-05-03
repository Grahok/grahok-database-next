export default function combineDateWithCurrentTime(dateStr) {
  if (!dateStr) {
    return null;
  } else {
    const date = new Date(dateStr);
    const now = new Date();

    date.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    date.setTime(date.getTime() + 6 * 60 * 60 * 1000);

    const dateWithTime = date.toISOString() || null;
    return dateWithTime;
  }
}
