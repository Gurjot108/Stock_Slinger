"use client";

import React, { useState, useEffect } from "react";
import { FiTrendingDown } from "react-icons/fi";
import { useRouter } from "next/navigation"; // ✅ Import router

const TopLosersCard = ({ topLosers }) => {
  const router = useRouter(); // ✅ Initialize router
  const itemsPerPage = 5;
  const autoCycleInterval = 5000;

  const [currentPage, setCurrentPage] = useState(0);

  const displayLosers = topLosers.slice(0, 20);
  const totalPages = Math.ceil(displayLosers.length / itemsPerPage);

  useEffect(() => {
    if (displayLosers.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, autoCycleInterval);

    return () => clearInterval(intervalId);
  }, [displayLosers.length, totalPages, autoCycleInterval]);

  useEffect(() => {
    setCurrentPage(0);
  }, [topLosers]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayLosers.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FiTrendingDown className="text-red-400" /> Top Losers
      </h2>
      <div className="space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((stock, i) => (
            <div
              key={stock.symbol || i}
              className="flex justify-between items-center p-3 bg-gray-800/70 rounded-lg border border-gray-700/50 hover:border-red-400/30 transition-colors cursor-pointer"
              onClick={() => router.push(`/company/${stock.symbol}`)} // ✅ Add router click handler
            >
              <div>
                <p className="text-white font-medium">{stock.symbol}</p>
                <p className="text-gray-400 text-sm">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white">${stock.price?.toFixed(2)}</p>
                <p className="text-red-400 text-sm">
                  {stock.changesPercentage?.toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No top losers available.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`block w-2 h-2 mx-1 rounded-full ${
                currentPage === index ? "bg-red-400" : "bg-gray-600"
              }`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopLosersCard;
