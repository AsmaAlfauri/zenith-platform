const PortfolioCard = ({ portfolio }) => {
  const changeColor = (change) =>
    change >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 space-y-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Total Value */}
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Total Portfolio Value
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            ${portfolio.totalValue.toLocaleString()}
          </p>
        </div>

        {/* Total Change */}
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Total Change
          </p>
          <p
            className={`text-lg sm:text-xl font-semibold ${changeColor(
              portfolio.totalChange
            )}`}
          >
            ${portfolio.totalChange.toLocaleString()} (
            {portfolio.totalChangePercent.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
