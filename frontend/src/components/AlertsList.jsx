import { severityColor } from "../utils/severityColor";
import {  formatTimestamp } from "../utils/formatDate";

const AlertsList = ({ alerts }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {alerts.slice(0, 5).map((alert) => (
        <div
          key={alert.id}
          className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700
                     flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base break-words">
                {alert.message}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {formatTimestamp(alert.timestamp)}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${severityColor(
                alert.severity
              )}`}
            >
              {alert.severity}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;
