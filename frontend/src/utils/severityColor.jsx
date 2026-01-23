
export const severityColor = (severity) => {
  if (!severity) {
    return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
  }

  const s = severity.toLowerCase();
  switch (s) {
    case "critical":
    case "high":
      return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
    case "medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100";
    case "low":
      return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
  }
};
