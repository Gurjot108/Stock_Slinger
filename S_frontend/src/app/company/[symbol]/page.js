"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import CompanyProfile from "../../../components/company/CompanyProfile";
import CompanyQuote from "../../../components/company/CompanyQuote";
import KeyMetrics from "../../../components/company/KeyMetrics";
import CompanyChart from "../../../components/company/CompanyChart";
import AddToWatchlistButton from "../../../components/watchlist/AddToWatchListButton";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const CompanyPage = ({ params }) => {
  const { symbol } = params;
  const router = useRouter();
  const { user } = useUser();

  const [profile, setProfile] = useState(null);
  const [quote, setQuote] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchCompanyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, quoteRes, metricsRes, chartRes] = await Promise.all([
          fetch(`${API_BASE_URL}/company/profile/${symbol}`),
          fetch(`${API_BASE_URL}/company/quote/${symbol}`),
          fetch(`${API_BASE_URL}/company/key-metrics/${symbol}`),
          fetch(`${API_BASE_URL}/company/${symbol}/chart`),
        ]);

        if (!profileRes.ok)
          throw new Error(
            `Failed to fetch profile data (status: ${profileRes.status})`
          );
        if (!quoteRes.ok)
          throw new Error(
            `Failed to fetch quote data (status: ${quoteRes.status})`
          );
        if (!metricsRes.ok)
          throw new Error(
            `Failed to fetch key metrics (status: ${metricsRes.status})`
          );
        if (!chartRes.ok)
          throw new Error(
            `Failed to fetch chart data (status: ${chartRes.status})`
          );

        const [profileData, quoteData, metricsData, chartRawData] =
          await Promise.all([
            profileRes.json(),
            quoteRes.json(),
            metricsRes.json(),
            chartRes.json(),
          ]);

        setProfile(profileData);
        setQuote(quoteData);
        setMetrics(metricsData);
        setChartData(chartRawData);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError(
          err.message || "Error loading company data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchWatchlist = async () => {
      if (!user) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/watchlist?userId=${encodeURIComponent(
            user.sub
          )}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setWatchlist(data.watchlist || []);
        }
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };

    if (symbol) {
      fetchCompanyData();
      fetchWatchlist();
    } else {
      setError("Company symbol is missing.");
      setLoading(false);
    }
  }, [symbol, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center w-full">
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 hover:scale-105 transform-gpu origin-center py-3">
                Loading Company Data
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed mt-2">
              Please wait while we fetch the latest market info...
            </p>
          </div>

          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col justify-center items-center p-6 text-center">
        <div className="bg-gray-800/60 backdrop-blur-md p-8 rounded-xl border border-red-700/50 shadow-xl max-w-lg w-full">
          <h2 className="text-3xl font-semibold mb-4 text-red-400">
            An Error Occurred
          </h2>
          <p className="text-gray-300 mb-8 text-lg">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        {profile && profile.companyName && (
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  {profile.companyName} ({profile.symbol})
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-400">
                  {profile.exchangeShortName && (
                    <span className="flex items-center">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {profile.exchangeShortName}
                    </span>
                  )}
                  {profile.industry && (
                    <span className="flex items-center">
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {profile.industry}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 items-center">
                {!watchlist.some((item) => item.symbol === symbol) && (
                  <AddToWatchlistButton profile={profile} quote={quote} />
                )}
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-1 transition-colors"
                >
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CompanyProfile profile={profile} />
            <CompanyChart stock={symbol} fullData={chartData} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <CompanyQuote quote={quote} />
            <KeyMetrics metrics={metrics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
