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
        const [portfolioResponse, dashboardResponse] = await Promise.all([
          getPortfolio(),
          getDashboard(),
        ]);

        // ✅ FIX: no extra .data.data
        setPortfolio(portfolioResponse.data);
        setDashboard(dashboardResponse.data);
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
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 space-y-6">
          <TopGainersLosers
            data={{
              topGainers:
                dashboard?.topStocks?.filter((s) => s.changePercent > 0) || [],
              topLosers:
                dashboard?.topStocks?.filter((s) => s.changePercent < 0) || [],
            }}
          />
        </div>

        <div className="lg:w-1/2 space-y-6">
          <RecentNews news={dashboard?.recentNews || []} />
          <ActiveAlerts alerts={dashboard?.alerts || []} />
        </div>
      </div>

      <PortfolioCard portfolio={portfolio?.portfolio || portfolio} />
    </div>
  );
};

export default Dashboard;
