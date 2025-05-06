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
    const dateWithTime = date.toISOString() || null;
    return dateWithTime;
  }
}
