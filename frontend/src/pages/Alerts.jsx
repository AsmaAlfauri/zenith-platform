import { useState, useEffect } from "react";
import { getAlerts } from "../services/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AlertsList from "../components/AlertsList";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All"); // All / High / Medium / Low

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const response = await getAlerts();
        setAlerts(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch alerts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = () => {
    if (filter === "All") return alerts;
    return alerts.filter(
      (alert) => alert.severity.toLowerCase() === filter.toLowerCase()
    );
  };

  if (loading) return <Loading count={5} height={40} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  const alertLevels = ["All", "High", "Medium", "Low"];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
        Alerts
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mb-4">
        {alertLevels.map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-300
              w-full sm:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${
                filter === level
                  ? "bg-red-500 text-white dark:bg-red-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <AlertsList alerts={filteredAlerts()} />
    </div>
  );
};

export default AlertsPage;
