import { useState, useEffect } from "react";
import { getNews } from "../services/api";

import Loading from "../components/Loading";
import Error from "../components/Error";
import NewsList from "../components/NewsList";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNews();
        setNews(res?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = () => {
    if (category === "All") return news;
    return news.filter(
      (n) => n?.category?.toLowerCase() === category.toLowerCase()
    );
  };

  if (loading) return <Loading count={5} height={50} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold">News</h1>

      <div className="flex gap-2 flex-wrap my-4">
        {["All", "market", "crypto", "technology"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="px-4 py-2 border rounded"
          >
            {c}
          </button>
        ))}
      </div>

      <NewsList news={filteredNews()} />
    </div>
  );
};

export default News;