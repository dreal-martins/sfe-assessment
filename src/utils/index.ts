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
