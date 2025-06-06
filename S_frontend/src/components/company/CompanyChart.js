import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeRanges = [
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
];

const getFilteredData = (data, range) => {
  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;
  let days = 30;

  if (range === "1w") days = 7;
  else if (range === "1m") days = 30;
  else if (range === "6m") days = 180;
  else if (range === "1y") days = 365;

  const cutoff = new Date(now - days * msInDay);
  return data.filter((entry) => new Date(entry.date) >= cutoff);
};

const CompanyChart = ({ stock, fullData }) => {
  const [range, setRange] = useState("1m");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!fullData?.length) return;

    const filtered = getFilteredData(fullData, range).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const labels = filtered.map((item) => item.date);
    const prices = filtered.map((item) => item.close);

    setChartData({
      labels,
      datasets: [
        {
          label: `${stock} Price`,
          data: prices,
          borderColor: "#22d3ee",
          backgroundColor: "rgba(34, 211, 238, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
        },
      ],
    });
  }, [range, fullData, stock]);

  return (
    <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18v4H3V4z"
            />
          </svg>
          Price Performance
        </h3>

        <div className="flex gap-2">
          {timeRanges.map((tr) => (
            <button
              key={tr.value}
              onClick={() => setRange(tr.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                range === tr.value
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tr.label}
            </button>
          ))}
        </div>
      </div>

      {!chartData ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">
            Loading chart data...
          </div>
        </div>
      ) : (
        <div className="h-80">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                  backgroundColor: "rgba(8, 16, 24, 0.9)",
                  titleColor: "#7dd3fc",
                  bodyColor: "#e5e7eb",
                  borderColor: "rgba(34, 211, 238, 0.5)",
                  borderWidth: 1,
                  padding: 12,
                  callbacks: {
                    label: (context) => {
                      return ` ${context.dataset.label}: $${context.raw.toFixed(
                        2
                      )}`;
                    },
                  },
                },
              },
              interaction: {
                intersect: false,
                mode: "nearest",
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    color: "#9ca3af",
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 6,
                  },
                },
                y: {
                  grid: {
                    color: "rgba(55, 65, 81, 0.5)",
                    drawBorder: false,
                  },
                  ticks: {
                    color: "#9ca3af",
                    callback: (value) => `$${value}`,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 2,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyChart;
