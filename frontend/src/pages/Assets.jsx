import { useState, useEffect } from "react";
import { getStocks, getCrypto } from "../services/api";
import AssetsTable from "../components/AssetsTable";
import FilterButtons from "../components/FilterButtons";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AssetModal from "../components/AssetModal";

const AssetsPage = () => {
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocksResponse = await getStocks();
        const cryptoResponse = await getCrypto();

        setStocks(stocksResponse.data);
        setCrypto(cryptoResponse.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch assets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAssets = () => {
    let assetsList = [];
    if (filter === "All") assetsList = [...stocks, ...crypto];
    else if (filter === "Stocks") assetsList = stocks;
    else if (filter === "Crypto") assetsList = crypto;

    if (!searchTerm) return assetsList;

    return assetsList.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) return <Loading count={10} height={40} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        📊 Assets
      </h1>

      {/* Search Input */}
      <div className="mb-4 w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search by symbol or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md 
                     bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-gray-200 
                     border-gray-300 dark:border-gray-700 
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition-colors duration-300"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
        <FilterButtons currentFilter={filter} setFilter={setFilter} />
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto">
        <AssetsTable
          assets={filteredAssets()}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          onRowClick={setSelectedAsset}
        />

        {selectedAsset && (
          <AssetModal
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AssetsPage;
