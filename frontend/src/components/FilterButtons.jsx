const FilterButtons = ({ currentFilter, setFilter }) => {
  const filters = ['All', 'Stocks', 'Crypto'];

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`
            px-4 py-2 sm:px-5 sm:py-2 rounded-md font-semibold border 
            w-full sm:w-auto text-sm sm:text-base
            transform transition-all duration-300
            hover:scale-105 hover:shadow-xl
            ${
              currentFilter === filter
                ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
