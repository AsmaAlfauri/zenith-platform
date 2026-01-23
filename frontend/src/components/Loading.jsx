const Loading = ({ height = 32, count = 1 }) => {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-700 rounded-md animate-zenith w-full"
          style={{ height: `${height}px` }}
        ></div>
      ))}
    </div>
  );
};

export default Loading;
