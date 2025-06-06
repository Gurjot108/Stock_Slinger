import React from "react";
import { FiBarChart2 } from "react-icons/fi";

const GlobalIndicesCard = ({ indices, onIndexClick }) => {
  if (!indices || indices.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm text-center text-gray-400">
        Global Indices data not available (likely free tier limitation).
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FiBarChart2 className="text-cyan-400" /> Global Indices
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {indices.map((index, i) => (
          <div
            key={i}
            onClick={() => onIndexClick && onIndexClick(index)}
            className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/50 hover:border-cyan-400/30 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-100 font-semibold">{index.name}</span>
              <div className="text-right">
                <p className="text-white font-medium">
                  $
                  {index.price?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p
                  className={`text-sm ${
                    index.changePercentage >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {index.change >= 0 ? "+" : ""}
                  {index.change?.toFixed(2)} (
                  {index.changePercentage?.toFixed(2)}%)
                </p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  index.changePercentage >= 0 ? "bg-green-500" : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    Math.abs(index.changePercentage) * 10
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalIndicesCard;
