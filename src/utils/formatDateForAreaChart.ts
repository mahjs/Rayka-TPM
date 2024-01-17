export default function formatDateForAreaChart(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return [
    `${hours}:${minutes}`,
    `${year}-${month}-${day}`,
    `${year}-${month}-${day} ${hours}:${minutes}`
  ];
}
