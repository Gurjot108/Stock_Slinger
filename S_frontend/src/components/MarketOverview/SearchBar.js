import React, { useState, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const SearchBar = ({ selectedCategory, setSelectedCategory, categories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/search?query=${query}`);
      const data = await res.json();
      setSuggestions(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchSuggestions, 1000), []);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return debouncedSearch.cancel;
  }, [searchQuery, debouncedSearch]);

  const handleSuggestionClick = (symbol) => {
    router.push(`/company/${symbol}`);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery) {
      const exactMatch = suggestions.find(
        (item) => item.symbol.toLowerCase() === searchQuery.toLowerCase()
      );

      if (exactMatch) {
        handleSuggestionClick(exactMatch.symbol);
      } else if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0].symbol);
      }
    }
  };

  return (
    <div className="mb-10 bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 relative">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for Stock, Mutual Fund or ETF"
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            onKeyDown={handleKeyDown}
          />

          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-white max-h-64 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.symbol}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(item.symbol)}
                  onMouseDown={(e) => e.preventDefault()} // Prevents input blur before click
                >
                  <div className="font-semibold">{item.symbol}</div>
                  <div className="text-gray-400 text-xs">
                    {item.name} - {item.exchange}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSearchQuery("");
                setSuggestions([]);
                setShowDropdown(false);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
