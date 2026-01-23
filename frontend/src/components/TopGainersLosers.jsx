const TopGainersLosers = ({ data }) => {
  const { topGainers, topLosers } = data;

  const changeColor = (change) =>
    change >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400";
  const changeIcon = (change) => (change >= 0 ? "🔼" : "🔽");

  const renderAsset = (asset) => (
    <li
      key={asset.symbol}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <div className="flex-1 space-y-1">
        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
          {asset.symbol} - {asset.name}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          Price:{" "}
          {asset.currentPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <span
        className={`mt-2 sm:mt-0 px-2 py-1 rounded-full font-semibold text-sm sm:text-base ${changeColor(
          asset.changePercent
        )}`}
      >
        {changeIcon(asset.changePercent)} {asset.changePercent.toFixed(2)}%
      </span>
    </li>
  );

  return (
    <div className="space-y-6">
      {/* Top Gainers */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md space-y-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          📈 Top Gainers
        </h2>
        <ul className="space-y-2">{topGainers.slice(0, 3).map(renderAsset)}</ul>
      </div>

      {/* Top Losers */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md space-y-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          📉 Top Losers
        </h2>
        <ul className="space-y-2">{topLosers.slice(0, 3).map(renderAsset)}</ul>
      </div>
    </div>
  );
};

export default TopGainersLosers;
