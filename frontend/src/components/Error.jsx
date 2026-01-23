const Error = ({ message, onRetry }) => {
  return (
    <div
      className="text-center space-y-2 p-4 sm:p-6 
                 bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 
                 rounded-lg transition-colors duration-300"
    >
      <p className="text-sm sm:text-base font-medium">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-500 text-white dark:bg-blue-600 dark:text-white 
                     px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium 
                     transition-colors duration-300 hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
