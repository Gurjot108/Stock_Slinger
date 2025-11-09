"use client";
import React, { useState } from "react";

const FinanceChat = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;
    setLoading(true);

    const userMsg = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const botMsg = {
        role: "bot",
        text: data.reply || "No response received.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching Gemini response." },
      ]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700/40 rounded-3xl p-6 mt-12 shadow-md text-gray-100">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
        💬 Finance Assistant
      </h2>

      {/* Chat window */}
      <div className="max-h-[350px] overflow-y-auto mb-4 space-y-3 px-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              m.role === "user"
                ? "bg-cyan-600/30 text-white self-end ml-auto w-fit"
                : "bg-gray-800/70 text-cyan-200 self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">Bot is typing...</p>}
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about a stock or finance concept..."
          className="flex-1 bg-gray-800/70 border border-gray-600 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FinanceChat;
