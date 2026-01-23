import { useState, useEffect } from "react";
import { getDashboard, getPortfolio } from "../services/api";
import PortfolioCard from "../components/PortfolioCard";
import TopGainersLosers from "../components/TopGainersLosers";
import RecentNews from "../components/RecentNews";
import ActiveAlerts from "../components/ActiveAlerts";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const portfolioResponse = await getPortfolio();
        setPortfolio(portfolioResponse.data.data);

        const dashboardResponse = await getDashboard();
        setDashboard(dashboardResponse.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading count={4} height={48} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      {/* Top Section: Gainers/Losers + News + Alerts */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 space-y-6">
          <TopGainersLosers data={dashboard} />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <RecentNews news={dashboard.recentNews} />
          <ActiveAlerts alerts={dashboard.activeAlerts} />
        </div>
      </div>

      {/* Portfolio */}
      <div className="w-full">
        <PortfolioCard portfolio={portfolio} />
      </div>
    </div>
  );
};

export default Dashboard;
