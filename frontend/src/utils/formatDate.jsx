export const formatTimestamp = (ts) => {
  const date = new Date(ts);
  return date.toLocaleString("en-US", {
    hour12: true,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
