"use client";

import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl text-center w-full">
        {/* Title with refined gradient and animation */}
        {/* Increased padding-bottom (pb-3) to ensure descenders are fully visible */}
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 tracking-tight inline-block leading-relaxed transition-transform duration-500 hover:scale-105 pb-3">
          Stockslinger
        </h1>

        {/* Tagline with better typography - changed font weight to light */}
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
          Precision portfolio management with real-time analytics and
          intelligent market insights.
        </p>

        {/* Feature Boxes with improved card design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Portfolio Analytics",
              description:
                "Advanced tracking with performance metrics and risk assessment tools.",
              icon: "📊",
            },
            {
              title: "Custom Watchlists",
              description:
                "Curate and monitor securities with personalized alerts and triggers.",
              icon: "👁️",
            },
            {
              title: "Market Intelligence",
              description:
                "Actionable insights powered by comprehensive data aggregation.",
              icon: "💡",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-3 text-cyan-400">
                {feature.title}
              </h2>
              {/* Changed font weight to light for descriptions */}
              <p className="text-gray-300/90 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA with better visual hierarchy */}
        <div className="mt-20">
          <button className="relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-12 rounded-full text-md font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 border border-cyan-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
          <p className="text-gray-400 text-sm mt-4"></p>
        </div>
      </div>
    </div>
  );
}
