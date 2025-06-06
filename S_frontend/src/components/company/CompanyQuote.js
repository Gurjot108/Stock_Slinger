import React from "react";

const formatNumber = (num) => {
  if (num === undefined || num === null) return "-";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

const CompanyQuote = ({ quote }) => {
  if (!quote) return null;

  const changeColor = quote.change >= 0 ? "text-green-400" : "text-red-400";
  const changeIcon = quote.change >= 0 ? "arrow-up" : "arrow-down";

  return (
    <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <svg
            className="w-5 h-5 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          Market Data
        </h3>
        <div className={`flex items-center ${changeColor}`}>
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={changeIcon === "arrow-up" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
          {quote.change >= 0 ? "+" : ""}
          {quote.change?.toFixed(2)} ({quote.changesPercentage?.toFixed(2)}%)
        </div>
      </div>

      <div className="space-y-4">
        {/* Price Card */}
        <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-400">Current Price</div>
              <div className="text-2xl font-bold">
                ${quote.price?.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Previous Close</div>
              <div className="text-lg">${quote.previousClose?.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Open", value: `$${quote.open?.toFixed(2)}` },
            {
              label: "Day Range",
              value: `$${quote.dayLow?.toFixed(2)} - $${quote.dayHigh?.toFixed(
                2
              )}`,
            },
            {
              label: "52W Range",
              value: `$${quote.yearLow?.toFixed(
                2
              )} - $${quote.yearHigh?.toFixed(2)}`,
            },
            { label: "Volume", value: formatNumber(quote.volume) },
            { label: "Avg Volume", value: formatNumber(quote.avgVolume) },
            { label: "Exchange", value: quote.exchange || "-" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30"
            >
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-white font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuote;
