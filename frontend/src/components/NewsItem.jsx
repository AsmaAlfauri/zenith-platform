import { formatTimestamp } from "../utils/formatDate";
import { impactColors } from "../utils/impactColors";


const NewsItem = ({ item }) => {
  return (
    <li className="border-b pb-4 space-y-2 sm:flex sm:justify-between sm:items-start sm:space-y-0 sm:space-x-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-md bg-white dark:bg-gray-800 p-3 sm:p-4">
      {/* Left side: Title & summary */}
      <div className="flex-1">
        <p className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-gray-100">{item.title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
          {item.source} • {formatTimestamp(item.timestamp)}

        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mt-1">{item.summary}</p>
        {item.affectedAssets.length > 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
            Affected Assets: {item.affectedAssets.join(", ")}
          </p>
        )}
      </div>

      {/* Right side: Badges */}
      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-end">
        <span
          className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full ${impactColors[item.impact]}`}
        >
          Impact: {item.impact}
        </span>
        <span className="inline-block px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-full">
          Category: {item.category}
        </span>
      </div>
    </li>
  );
};

export default NewsItem;
