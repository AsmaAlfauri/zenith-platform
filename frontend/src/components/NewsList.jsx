import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
  return (
    <ul className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md space-y-4 transition-colors duration-300">
      {news.length === 0 ? (
        <li className="text-center text-gray-500 dark:text-gray-400 py-4">
          No news available 📰
        </li>
      ) : (
        news.map((item, index) => <NewsItem key={index} item={item} />)
      )}
    </ul>
  );
};

export default NewsList;
