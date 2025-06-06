import React from "react";

const Loading = () => {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-8 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex justify-center items-center min-h-[160px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );
};

export default Loading;
