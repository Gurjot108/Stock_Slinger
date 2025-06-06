"use client";

import React, { useEffect, useState } from "react";
import NewsFeed from "@/components/common/NewsFeed";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/news`);
        const data = await res.json();
        setNews(data.results || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center w-full">
        {/* Title Section - Matching HomePage Style */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 hover:scale-105 transform-gpu origin-center py-3">
              Financial Pulse
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed mt-2">
            Real-time market intelligence and breaking financial news
          </p>
        </div>

        {/* Content Section */}
        <div className="">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent"></div>
              <p className="text-gray-400 mt-4 text-lg">
                Loading market updates...
              </p>
            </div>
          ) : news.length > 0 ? (
            <NewsFeed news={news} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No updates available - check back soon
              </p>
              <button className="mt-6 relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-8 rounded-full text-md font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                <span className="relative z-10">Refresh Updates</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
