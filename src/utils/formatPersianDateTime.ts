export default function formatPersianDateTime(date: Date) {
  // Create Intl.DateTimeFormat instances for date and time
  const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    calendar: "persian",
  });
  const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Format the date and time
  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  // Combine date and time
  return `${formattedDate} - ${formattedTime}`;
}
