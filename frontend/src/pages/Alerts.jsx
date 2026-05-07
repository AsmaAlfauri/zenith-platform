import { useState, useEffect } from "react";
import { getAlerts } from "../services/api";

import Loading from "../components/Loading";
import Error from "../components/Error";
import AlertsList from "../components/AlertsList";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let interval;

    const fetchData = async () => {
      try {
        setError(null);

        const response = await getAlerts();

        setAlerts(response?.data || []);
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
      (alert) =>
        alert?.severity?.toLowerCase() === filter.toLowerCase()
    );
  };

  if (loading) return <Loading count={5} height={40} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  const alertLevels = ["All", "High", "Medium", "Low"];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">Alerts</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {alertLevels.map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-md border ${
              filter === level
                ? "bg-red-500 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <AlertsList alerts={filteredAlerts()} />
    </div>
  );
};

export default AlertsPage;