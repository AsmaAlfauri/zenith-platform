import { severityColor } from "../utils/severityColor";
import {  formatTimestamp } from "../utils/formatDate";

const ActiveAlerts = ({ alerts }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 space-y-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        🔔 Active Alerts
      </h2>
      <ul className="space-y-3 sm:space-y-4">
        {alerts.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No active alerts 🎉
          </p>
        )}
        {alerts.slice(0, 5).map((alert, index) => (
          <li
            key={alert.id || index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-3"
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveAlerts;
