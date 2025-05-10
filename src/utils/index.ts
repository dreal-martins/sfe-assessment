// export function getCurrentDateTime() {
//   const now = new Date();

//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const day = daysOfWeek[now.getDay()];
//   const date = now.getDate();
//   const month = months[now.getMonth()];
//   const year = now.getFullYear();

//   let hours = now.getHours();
//   const minutes = now.getMinutes().toString().padStart(2, "0");
//   const ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12;
//   const time = `${hours}:${minutes}${ampm}`;

//   return `${day} ${date}${getOrdinalSuffix(date)}, ${month} ${year} ${time}`;
// }
export function getCurrentDateTime(locale: string = "en") {
  const now = new Date();

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${dateFormatter.format(now)} ${timeFormatter.format(now)}`;
}

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const sortTableData = <T>(data: T[], key: keyof T) => {
  if (!data) return [];

  return [...data].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    const valueAString =
      typeof valueA === "string"
        ? valueA.toLowerCase()
        : String(valueA).toLowerCase();
    const valueBString =
      typeof valueB === "string"
        ? valueB.toLowerCase()
        : String(valueB).toLowerCase();

    return valueAString.localeCompare(valueBString);
  });
};
