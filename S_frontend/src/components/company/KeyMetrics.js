import React from "react";

const KeyMetrics = ({ metrics }) => {
  if (!metrics) return null;

  const metricsData = [
    {
      label: "Current Ratio",
      value: metrics.currentRatio?.toFixed(2) || "-",
      description: "Measures short-term liquidity (higher is better)",
    },
    {
      label: "Debt to Equity",
      value: metrics.debtToEquity?.toFixed(2) || "-",
      description: "Shows financial leverage (lower is typically better)",
    },
    {
      label: "Dividend Yield",
      value: metrics.dividendYield
        ? (metrics.dividendYield * 100).toFixed(2) + "%"
        : "-",
      description: "Annual dividend as % of share price",
    },
  ];

  return (
    <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Key Metrics
      </h3>

      <div className="space-y-4">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {metric.label}
                </div>
                <div className="text-2xl font-bold mt-1">{metric.value}</div>
              </div>
              <div className="text-xs text-gray-400 max-w-[180px] text-right">
                {metric.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
