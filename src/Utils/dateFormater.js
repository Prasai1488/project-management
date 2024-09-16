export const getNowTimeStamp = () => {
  return Intl.DateTimeFormat("fr-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
};

export const timeFormater = (date) => {
  if (date) {
    return Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  }
};
export const dateFormater = (date) => {
  if (date) {
    return Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  }
};
