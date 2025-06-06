"use client";

import React from "react";
import Link from "next/link";

const Watchlist = ({ watchlist = [], onRemoveItem }) => {
  if (!watchlist.length)
    return (
      <p className="text-center text-gray-400 mt-10 font-light italic select-none">
        Your watchlist is empty. Add some stocks to get started!
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {watchlist.map((item) => (
        <div
          key={item.symbol}
          className="relative bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-sm hover:border-cyan-500/40 hover:shadow-md transition-all duration-200"
        >
          {/* Remove button (not clickable through link) */}
          <button
            onClick={() => onRemoveItem(item.symbol)}
            aria-label={`Remove ${item.symbol} from watchlist`}
            className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full p-1 bg-transparent text-gray-400 hover:bg-red-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            title="Remove from watchlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Clickable content */}
          <Link
            href={`/company/${item.symbol}`}
            className="block hover:no-underline"
          >
            <div className="flex items-center space-x-4 mb-4 cursor-pointer">
              {item.logoUrl && (
                <img
                  src={item.logoUrl}
                  alt={`${item.name} logo`}
                  className="w-12 h-12 rounded-md object-contain border border-cyan-600/50 shadow-sm"
                  loading="lazy"
                />
              )}
              <div>
                <h3 className="text-white text-xl font-extrabold tracking-tight select-text">
                  {item.symbol}
                </h3>
                <p className="text-cyan-400 font-semibold text-base">
                  {item.name}
                </p>
                <p className="text-gray-400 text-sm">{item.exchange}</p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-gray-300 font-medium text-sm">
                Current Price:{" "}
                <span className="text-cyan-300 text-base font-bold">
                  ${item.currentPrice?.toFixed(2) ?? "N/A"}
                </span>
              </p>
              <p
                className={`font-semibold text-base ${
                  item.percentChange > 0
                    ? "text-green-400"
                    : item.percentChange < 0
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {item.priceChange?.toFixed(2) ?? "0"} (
                {item.percentChange?.toFixed(2) ?? "0"}%)
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
