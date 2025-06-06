import React, { useState, useEffect, useRef } from "react";
import { FiDollarSign } from "react-icons/fi";
import { useRouter } from "next/navigation";

const InstrumentGrid = ({ instruments, selectedCategory }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const instrumentsPerPage = 9;
  const intervalRef = useRef(null);
  const totalPages = Math.ceil(instruments.length / instrumentsPerPage);

  const currentInstruments = instruments.slice(
    (currentPage - 1) * instrumentsPerPage,
    currentPage * instrumentsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [instruments, selectedCategory]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (totalPages > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [totalPages]);

  const handleCardClick = (symbol) => {
    router.push(`/company/${symbol}`);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FiDollarSign className="text-cyan-400" />
        {selectedCategory.charAt(0).toUpperCase() +
          selectedCategory.slice(1)}{" "}
        Instruments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentInstruments.length > 0 ? (
          currentInstruments.map((item, i) => (
            <div
              key={i}
              className="bg-gray-800/70 p-4 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer group"
              onClick={() => handleCardClick(item.symbol)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.symbol}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.name}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.change >= 0
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.change >= 0 ? "+" : ""}
                  {item.change?.toFixed(2)}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-white text-lg font-medium">
                  ${item.price?.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">{item.volume}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No instruments found for this category.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 mx-1 rounded-full ${
                currentPage === idx + 1 ? "bg-cyan-400" : "bg-gray-600"
              }`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstrumentGrid;
