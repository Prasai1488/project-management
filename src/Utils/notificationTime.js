export const notificationTime = (created_date_ad) => {
  const previous = new Date(created_date_ad).getTime();
  const current = new Date().getTime();
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;
  const elapsed = current - previous;
  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }
  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + " h ago";
  } else if (elapsed < milliSecondsPerMonth) {
    let value = Math.round(elapsed / milliSecondsPerDay);
    if (value <= 1) {
      return value + " day ago";
    } else {
      return value + " days ago";
    }
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + " mo ago";
  } else {
    let value = Math.round(elapsed / milliSecondsPerYear);
    if (value <= 1) {
      return value + " year ago";
    } else {
      return value + " years ago";
    }
  }
};
