"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Watchlist from "../../components/watchlist/Watchlist";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const PortfolioPage = () => {
  const { user, isLoading: userLoading, error: userError } = useUser();

  const [watchlistData, setWatchlistData] = useState([]);
  const [loadingPortfolioData, setLoadingPortfolioData] = useState(false);
  const [portfolioDataError, setPortfolioDataError] = useState("");

  const calculateSummaryStats = (list) => {
    const total = list.length;
    const value = list.reduce(
      (sum, stock) => sum + (stock.currentPrice ?? 0),
      0
    );
    const change = list.reduce(
      (sum, stock) => sum + (stock.priceChange ?? 0),
      0
    );
    return { total, value, change };
  };

  const [summaryStats, setSummaryStats] = useState({
    total: 0,
    value: 0,
    change: 0,
  });

  useEffect(() => {
    if (!user) {
      setWatchlistData([]);
      setSummaryStats({ total: 0, value: 0, change: 0 });
      return;
    }

    const fetchPortfolioData = async () => {
      setLoadingPortfolioData(true);
      setPortfolioDataError("");

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/watchlist?userId=${encodeURIComponent(
            user.sub
          )}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to fetch portfolio data"
          );
        }

        const { watchlist = [] } = await res.json();
        setWatchlistData(watchlist);
        setSummaryStats(calculateSummaryStats(watchlist));
      } catch (err) {
        setPortfolioDataError(err.message);
        setWatchlistData([]);
        setSummaryStats({ total: 0, value: 0, change: 0 });
      } finally {
        setLoadingPortfolioData(false);
      }
    };

    fetchPortfolioData();
  }, [user]);

  const removeItem = async (symbol) => {
    if (!user) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/watchlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ symbol, userId: user.sub }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to remove item");
      }

      const updated = await res.json();
      const updatedList = updated.watchlist ?? [];
      setWatchlistData(updatedList);
      setSummaryStats(calculateSummaryStats(updatedList));
    } catch (err) {
      alert("Error removing item: " + err.message);
    }
  };

  const isLoading = userLoading || loadingPortfolioData;
  const error = userError?.message || portfolioDataError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-16 px-6 flex flex-col items-center">
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Loading portfolio data...
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 font-semibold text-lg select-none">
          {error}
        </p>
      )}

      {!isLoading && !error && user ? (
        <section className="max-w-6xl w-full space-y-16 py-4">
          <header className="text-center mb-8">
            <h1
              className="
      text-5xl md:text-6xl font-bold mb-5 tracking-tight select-none
      bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent
      transition-transform duration-500 transform-gpu origin-center
      hover:scale-105
    "
            >
              Your Portfolio
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto font-light text-lg leading-relaxed px-4">
              Dive into your investments with real-time insights and manage your
              watchlist with ease.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <StatCard label="Total Stocks" value={summaryStats.total} />
            <StatCard
              label="Portfolio Value"
              value={`$${summaryStats.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />
            <StatCard
              label="Daily Change"
              value={
                summaryStats.change > 0
                  ? `+${summaryStats.change.toFixed(2)}`
                  : summaryStats.change.toFixed(2)
              }
              colorClass={
                summaryStats.change > 0
                  ? "text-green-400"
                  : summaryStats.change < 0
                  ? "text-red-400"
                  : "text-gray-400"
              }
            />
          </div>

          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700/40 shadow-md p-8 md:p-10 mx-4">
            <Watchlist watchlist={watchlistData} onRemoveItem={removeItem} />
          </div>
        </section>
      ) : (
        !isLoading && (
          <p className="text-gray-400 font-light text-center mt-20 text-lg select-none">
            Please log in to view your portfolio.
          </p>
        )
      )}
    </div>
  );
};

const StatCard = ({ label, value, colorClass = "text-white" }) => (
  <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700/50 text-center">
    <p className="text-sm text-cyan-400 uppercase font-semibold tracking-wider mb-2">
      {label}
    </p>
    <p className={`text-4xl font-extrabold ${colorClass}`}>{value}</p>
  </div>
);

export default PortfolioPage;
