"use client";

import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AddToWatchlistButton = ({ profile, quote, className = "" }) => {
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async () => {
    if (!user) {
      window.location.href = "/api/auth/login";
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/watchlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user.sub,
          symbol: profile.symbol,
          name: profile.companyName,
          exchange: profile.exchangeShortName,
          sector: profile.sector || profile.industry || "",
          logoUrl: profile.image,
          priceAtAdd: quote?.price ?? 0,
          currentPrice: quote?.price ?? 0,
          priceChange: quote?.change ?? 0,
          percentChange: quote?.changesPercentage ?? 0,
          lastUpdated: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add to watchlist");
      }

      setAdded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className={`mt-0 ${className}`}>
      {added ? (
        <p className="text-green-400 font-medium">Added to watchlist</p>
      ) : (
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium 
            transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add to Watchlist"}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AddToWatchlistButton;
