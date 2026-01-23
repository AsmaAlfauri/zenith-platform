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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let interval;
    const fetchPortfolio = async () => {
      try {
        const response = await getPortfolio();
        setPortfolio(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
    interval = setInterval(fetchPortfolio, 30000);

    // Detect dark mode for chart
    const dark = document.documentElement.classList.contains("dark");
    setDarkMode(dark);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading count={5} height={40} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">📊 Portfolio</h1>

      {/* Portfolio Summary */}
      <PortfolioSummary
        totalValue={portfolio.totalValue}
        totalChange={portfolio.totalChange}
        totalChangePercent={portfolio.totalChangePercent}
        assetsCount={portfolio.assets.length}
      />

      {/* Portfolio Chart */}
      <PortfolioChart assets={portfolio.assets} darkMode={darkMode} />

      {/* Watchlist */}
      <Watchlist symbols={portfolio.watchlist} />
    </div>
  );
};

export default PortfolioPage;
