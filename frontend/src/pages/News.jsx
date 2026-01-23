import { useState, useEffect } from "react";
import { getNews } from "../services/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import NewsList from "../components/NewsList";
import { categoryColor } from "../utils/categoryColor";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        setNews(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = () => {
    if (category === "All") return news;
    return news.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  };

  // عد الأخبار لكل category
  const countByCategory = (cat) => {
    if (cat === "All") return news.length;
    return news.filter((item) => item.category.toLowerCase() === cat.toLowerCase()).length;
  };

  if (loading) return <Loading count={5} height={50} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  const categories = [
    "All",
    "market",
    "crypto",
    "technology",
    "macro",
    "earnings",
    "regulatory",
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">📰 News</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${
                category === cat
                  ? cat === "All"
                    ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
                    : categoryColor(cat)
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} ({countByCategory(cat)})
          </button>
        ))}
      </div>

      {/* News List */}
      <NewsList news={filteredNews()} />
    </div>
  );
};

export default News;
