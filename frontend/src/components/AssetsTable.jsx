import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { formatNumber, formatPercent } from '../utils/formatNumber';

const AssetsTable = ({ assets, sortConfig, setSortConfig, onRowClick }) => {
  // Change color based on positive/negative
  const changeColor = (change) => (change >= 0 ? 'text-green-500' : 'text-red-500');

  // Sorting logic
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedAssets = () => {
    if (!sortConfig.key) return assets;
    return [...assets].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const renderHeader = (label, key) => {
    let icon = <FaSort className="inline ml-1 text-gray-400 dark:text-gray-300" />;
    if (sortConfig.key === key) {
      icon = sortConfig.direction === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />;
    }
    return (
      <th
        onClick={() => handleSort(key)}
        className="p-3 text-left cursor-pointer select-none whitespace-nowrap text-sm sm:text-base"
      >
        {label} {icon}
      </th>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop / Tablet */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
            <tr>
              {renderHeader('Symbol', 'symbol')}
              {renderHeader('Name', 'name')}
              {renderHeader('Price', 'currentPrice')}
              {renderHeader('Change %', 'changePercent')}
              {renderHeader('Volume', 'volume')}
            </tr>
          </thead>
          <tbody>
            {sortedAssets().map((asset) => (
              <tr
                key={asset.symbol}
                onClick={() => onRowClick?.(asset)}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transform transition duration-200 hover:scale-[1.01]"
              >
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">{asset.symbol}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{asset.name}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">${formatNumber(asset.currentPrice)}</td>
                <td className={`p-3 font-semibold ${changeColor(asset.changePercent)}`}>
                  {formatPercent(asset.changePercent)}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{formatNumber(asset.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {sortedAssets().map((asset) => (
          <div
            key={asset.symbol}
            onClick={() => onRowClick?.(asset)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-5 cursor-pointer transition-colors duration-300 hover:shadow-xl"
          >
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-white break-words">
                {asset.symbol}
              </span>
              <span className={`font-semibold text-lg sm:text-xl ${changeColor(asset.changePercent)}`}>
                {formatPercent(asset.changePercent)}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words mt-1">{asset.name}</p>

            <div className="mt-2 text-sm sm:text-base space-y-1 text-gray-700 dark:text-gray-300">
              <p>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Price:</span> ${formatNumber(asset.currentPrice)}
              </p>
              <p>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Volume:</span> {formatNumber(asset.volume)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsTable;
