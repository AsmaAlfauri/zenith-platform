const Watchlist = ({ symbols }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        📌 Watchlist
      </h2>
      <ul className="flex flex-wrap gap-2">
        {symbols.map((symbol, index) => (
          <li
            key={index}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-full font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 transition-colors duration-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
