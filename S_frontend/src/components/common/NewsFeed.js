import React from "react";

function NewsFeed({ news }) {
  return (
    // Reverted grid gap to original (gap-8) and removed max-width for original dimensions
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((article) => (
        <div
          key={article.id}
          // Added glow classes while preserving original dimensions and hover lift
          className="bg-gray-800/50 rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 border border-gray-700/50 hover:border-cyan-400/30 backdrop-blur-sm"
        >
          {article.image && (
            <img
              src={article.image}
              alt={article.headline}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-5 flex flex-col justify-between h-full">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              // Reverted headline color to original
              className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 no-underline"
              style={{ textDecoration: "none" }}
            >
              {article.headline}
            </a>
            {article.summary && (
              // Reverted summary text styling to original
              <p className="text-gray-400 text-sm mt-2">
                {article.summary.length > 120
                  ? article.summary.slice(0, 120) + "..."
                  : article.summary}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
