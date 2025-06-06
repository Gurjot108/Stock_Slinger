"use client";

import React, { useState, useEffect, useRef } from "react";
import MarketHeader from "../../components/MarketOverview/MarketHeader";
import SearchBar from "../../components/MarketOverview/SearchBar";
import GlobalIndicesCard from "../../components/MarketOverview/GlobalIndicesCard";
import InstrumentGrid from "../../components/MarketOverview/InstrumentGrid";
import TopGainersCard from "../../components/MarketOverview/TopGainersCard";
import TopLosersCard from "../../components/MarketOverview/TopLosersCard";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const MarketOverviewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("stocks");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [instruments, setInstruments] = useState({
    stocks: [],
    etfs: [],
    mf: [],
    commodities: [],
  });

  const [marketData, setMarketData] = useState({
    topGainers: [],
    topLosers: [],
  });

  // New state for fetched indices data
  const [indices, setIndices] = useState([]);

  const categories = ["stocks", "etfs", "mf", "commodities"];
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchAllData = async () => {
      try {
        const [
          stocksRes,
          etfsRes,
          mfRes,
          commRes,
          gainersRes,
          losersRes,
          indicesRes,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/instruments?category=stocks`),
          fetch(`${API_BASE_URL}/instruments?category=etfs`),
          fetch(`${API_BASE_URL}/instruments?category=mf`),
          fetch(`${API_BASE_URL}/instruments?category=commodities`),
          fetch(`${API_BASE_URL}/top-gainers`),
          fetch(`${API_BASE_URL}/top-losers`),
          fetch(`${API_BASE_URL}/market-indices`), // <-- fetch indices here
        ]);

        const [
          stocks,
          etfs,
          mf,
          commodities,
          topGainers,
          topLosers,
          indicesData,
        ] = await Promise.all([
          stocksRes.json(),
          etfsRes.json(),
          mfRes.json(),
          commRes.json(),
          gainersRes.json(),
          losersRes.json(),
          indicesRes.json(), // <-- parse indices JSON here
        ]);

        setInstruments({ stocks, etfs, mf, commodities });
        setMarketData({ topGainers, topLosers });
        setIndices(indicesData); // <-- set indices state here
        setLoading(false);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load market data. Try again later.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const displayedInstruments = instruments[selectedCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <MarketHeader />

        <SearchBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {error && (
          <div className="bg-red-900/50 text-red-300 p-4 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent"></div>
            <p className="text-gray-400 mt-6 text-lg">Loading market data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Pass fetched indices here instead of mock data */}
              <GlobalIndicesCard indices={indices} />
              <div className="min-h-[550px]">
                <InstrumentGrid
                  instruments={displayedInstruments}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
            <div className="space-y-6">
              <TopGainersCard topGainers={marketData.topGainers} />
              <TopLosersCard topLosers={marketData.topLosers} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketOverviewPage;
