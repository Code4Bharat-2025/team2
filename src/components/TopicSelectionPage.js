// TopicSelectionPage.js
import React from "react";
import { Link } from "react-router-dom";
import topicData from "../topics";

function TopicSelectionPage() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-primary mb-6">Smart Money Quest</h1>
      <div className="relative flex flex-col items-center space-y-6">
        {topicData.map((topic) => (
          <Link
            key={topic.id}
            to={`/learn/${topic.id}`}
            className="w-60 h-24 bg-white border-2 border-base-300 rounded-full shadow-md flex items-center justify-center space-x-2 hover:bg-yellow-100 transition"
          >
            <div className="text-3xl">{topic.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700">{topic.name}</h2>
          </Link>
        ))}
        <div className="absolute bottom-0 translate-y-8">
          <div className="text-5xl animate-bounce">🦉</div>
        </div>
      </div>
      <footer className="mt-12 text-sm text-gray-500">Inspired by Duolingo - Learn by Exploring 🌱</footer>
    </div>
  );
}

export default TopicSelectionPage;
