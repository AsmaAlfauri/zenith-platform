import { useEffect, useState } from "react";
import { getPortfolio } from "../services/api";

import Loading from "../components/Loading";
import Error from "../components/Error";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioChart from "../components/PortfolioChart";
import Watchlist from "../components/Watchlist";

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;

    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolio();
        setPortfolio(res?.data || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
    interval = setInterval(fetchPortfolio, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading count={5} height={40} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold">Portfolio</h1>

      <PortfolioSummary
        totalValue={portfolio?.totalValue || 0}
        totalChange={portfolio?.totalChange || 0}
        totalChangePercent={portfolio?.totalChangePercent || 0}
        assetsCount={portfolio?.assets?.length || 0}
      />

      <PortfolioChart
        assets={portfolio?.assets || []}
        darkMode={false}
      />

      <Watchlist symbols={portfolio?.watchlist || []} />
    </div>
  );
};

export default PortfolioPage;