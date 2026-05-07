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
        const [stocksRes, cryptoRes] = await Promise.all([
          getStocks(),
          getCrypto(),
        ]);

        setStocks(stocksRes?.data || []);
        setCrypto(cryptoRes?.data || []);
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
    let list = [];

    if (filter === "All") list = [...stocks, ...crypto];
    else if (filter === "Stocks") list = stocks;
    else if (filter === "Crypto") list = crypto;

    if (!searchTerm) return list;

    return list.filter(
      (a) =>
        a?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) return <Loading count={10} height={40} />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold">Assets</h1>

      <input
        className="w-full md:w-1/2 p-2 border rounded"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <FilterButtons currentFilter={filter} setFilter={setFilter} />

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
  );
};

export default AssetsPage;