export default function combineDateWithCurrentTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
  
    date.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
  
    return date;
  }
  