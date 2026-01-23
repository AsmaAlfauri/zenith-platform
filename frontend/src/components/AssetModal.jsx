import { formatNumber, formatPercent } from "../utils/formatNumber";

const AssetModal = ({ asset, onClose }) => {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3 sm:px-6 transition-opacity duration-300">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg relative
                   w-full max-w-xs sm:max-w-md md:max-w-lg
                   p-4 sm:p-6 transition-colors duration-300"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white 
                     text-lg sm:text-xl px-3 sm:px-4 py-2 rounded-md bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 ease-in-out text-white"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-3 text-gray-900 dark:text-white break-words">
          {asset.symbol}{" "}
          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base md:text-lg">
            - {asset.name}
          </span>
        </h2>

        {/* Info */}
        <div className="space-y-2 text-sm sm:text-base md:text-base text-gray-900 dark:text-gray-100">
          <p>
            <span className="font-semibold">Price:</span> $
            {formatNumber(asset.currentPrice)}
          </p>

          <p>
            <span className="font-semibold">Change:</span>{" "}
            {formatPercent(asset.changePercent)}
          </p>

          <p>
            <span className="font-semibold">Volume:</span>{" "}
            {formatNumber(asset.volume)}
          </p>

          {asset.marketCap && (
            <p>
              <span className="font-semibold">Market Cap:</span> $
              {formatNumber(asset.marketCap)}
            </p>
          )}
        </div>

        {/* Description */}
        {asset.description && (
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-base leading-relaxed break-words">
            {asset.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssetModal;
