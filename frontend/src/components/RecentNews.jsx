import { categoryColor } from "../utils/categoryColor";
import {  formatTimestamp } from "../utils/formatDate";

const RecentNews = ({ news }) => {


  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md space-y-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        📰 Recent News
      </h2>
      <ul className="space-y-4">
        {news.slice(0, 5).map((item, index) => (
          <li
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 pb-2 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center transition-colors duration-300"
          >
            {/* Left content */}
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                {item.title}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {item.source} • {formatTimestamp(item.timestamp)}
              </p>
            </div>

            {/* Category badge */}
            <div className="mt-2 sm:mt-0">
              <span
                className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full ${categoryColor(
                  item.category
                )}`}
              >
                {item.category}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNews;
