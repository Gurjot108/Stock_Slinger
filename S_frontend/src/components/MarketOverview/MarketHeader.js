import React from "react";

const MarketHeader = () => {
  return (
    <div className="mb-10 text-center">
      <h1
        className="
          text-5xl md:text-6xl font-bold text-transparent bg-clip-text
          bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight
          select-none transition-transform duration-700 transform-gpu origin-center
          hover:scale-105
        "
      >
        Market Pulse
      </h1>
      <p className="text-xl text-gray-400">
        Real-time insights into global financial markets
      </p>
    </div>
  );
};

export default MarketHeader;
