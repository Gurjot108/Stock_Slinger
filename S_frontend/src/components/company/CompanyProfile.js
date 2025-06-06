import React from "react";

const formatNumber = (num) => {
  if (!num && num !== 0) return "-";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + " T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + " B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + " M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + " K";
  return num.toString();
};

const CompanyProfile = ({ profile }) => {
  if (!profile) return null;

  const priceChangeClass =
    profile.changes > 0
      ? "text-green-400"
      : profile.changes < 0
      ? "text-red-400"
      : "text-gray-300";

  return (
    <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="relative">
            <img
              src={profile.image}
              alt={`${profile.companyName} logo`}
              className="w-28 h-28 object-contain rounded-lg border border-gray-700/50 bg-gray-900/50 p-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%232d3748' width='100' height='100' rx='10'/%3E%3Ctext fill='%23a0aec0' font-family='sans-serif' font-size='40' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${profile.symbol}%3C/text%3E%3C/svg%3E";
              }}
            />
            {profile.price && (
              <div className="absolute -bottom-3 left-0 right-0 mx-auto bg-gray-900 border border-gray-700 rounded-full px-3 py-1 w-max">
                <span className="font-medium">${profile.price.toFixed(2)}</span>
                <span className={`ml-1 text-xs ${priceChangeClass}`}>
                  {profile.changes > 0 ? "+" : ""}
                  {profile.changes.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            Visit Website
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{profile.companyName}</h2>
            <p className="text-gray-300 mt-2 text-sm leading-relaxed">
              {profile.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "CEO", value: profile.ceo, icon: "user" },
              { label: "Sector", value: profile.sector, icon: "chart-pie" },
              { label: "Industry", value: profile.industry, icon: "factory" },
              { label: "Country", value: profile.country, icon: "globe" },
              { label: "Exchange", value: profile.exchange, icon: "exchange" },
              { label: "IPO Date", value: profile.ipoDate, icon: "calendar" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="text-cyan-400 mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon === "user" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    )}
                    {item.icon === "chart-pie" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                      />
                    )}
                    {item.icon === "factory" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    )}
                    {item.icon === "globe" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                    {item.icon === "exchange" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    )}
                    {item.icon === "calendar" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    )}
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-gray-200 font-medium">
                    {item.value || "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Highlights */}
      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Financial Highlights
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Market Cap", value: formatNumber(profile.mktCap) },
            { label: "Beta", value: profile.beta?.toFixed(2) || "-" },
            { label: "Volume Avg", value: formatNumber(profile.volAvg) },
            { label: "Dividend", value: profile.lastDiv || "-" },
            {
              label: "52W Range",
              value: profile.range || "-",
              colSpan: "col-span-2",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.colSpan || ""} bg-gray-900/40 rounded-lg p-3`}
            >
              <div className="text-xs text-gray-400 uppercase tracking-wider">
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

export default CompanyProfile;
