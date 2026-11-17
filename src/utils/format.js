const formatDuration = (minutes) => {
  if (typeof minutes !== "number") {
    return "N/A"
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours && remainingMinutes) return `${hours}h ${remainingMinutes}m`;
  if (hours) return `${hours}h`;

  return `${remainingMinutes}m`;
};

const formatNumber = (number) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(number);
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatRating = (rating) => {
  if (rating == null || isNaN(rating)) return 0;

  return Number((rating / 2).toFixed(1));
};

export { formatDuration, formatNumber, formatDate, formatRating }