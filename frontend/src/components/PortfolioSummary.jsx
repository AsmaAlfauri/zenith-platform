const PortfolioSummary = ({ totalValue, totalChange, totalChangePercent, assetsCount }) => {
  const changeColor = totalChange >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center transition-colors duration-300">
      {/* Total Value */}
      <div className="flex flex-col">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Total Portfolio Value</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          ${totalValue.toLocaleString()}
        </p>
      </div>

      {/* Total Change */}
      <div className="flex flex-col">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Total Change</p>
        <p className={`text-xl sm:text-2xl font-semibold ${changeColor} tracking-tight`}>
          ${totalChange.toLocaleString()} ({totalChangePercent.toFixed(2)}%)
        </p>
      </div>

      {/* Assets Count */}
      <div className="flex flex-col">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Assets in Portfolio</p>
        <p className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl">{assetsCount}</p>
      </div>
    </div>
  );
};

export default PortfolioSummary;
