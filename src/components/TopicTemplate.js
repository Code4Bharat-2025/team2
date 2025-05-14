// TopicTemplate.js
import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";

function TopicTemplate({ topic }) {
  const [unlockedLevel, setUnlockedLevel] = useState(0);
  const [activeLevel, setActiveLevel] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(`progress_${topic.id}`);
    if (stored) setUnlockedLevel(parseInt(stored));
  }, [topic.id]);

  const handleQuizComplete = () => {
    const nextLevel = unlockedLevel + 1;
    if (nextLevel < topic.levels.length) {
      setUnlockedLevel(nextLevel);
      localStorage.setItem(`progress_${topic.id}`, nextLevel);
    }
    setActiveLevel(null);
  };

  const resetProgress = () => {
    localStorage.removeItem(`progress_${topic.id}`);
    setUnlockedLevel(0);
    setActiveLevel(null);
  };

  const progressPercent = Math.round(((unlockedLevel + 1) / topic.levels.length) * 100);

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{topic.icon} {topic.name}</h2>
        <button className="btn btn-outline btn-sm" onClick={resetProgress}>Restart Topic</button>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="bg-green-500 h-4 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {topic.levels.map((text, index) => (
          <button
            key={index}
            className={`p-4 rounded-lg text-left font-semibold shadow hover:scale-105 transition ${index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-blue-100' : 'bg-green-100'} ${index > unlockedLevel ? 'opacity-50 blur-sm cursor-not-allowed' : ''}`}
            onClick={() => index <= unlockedLevel && setActiveLevel(index)}
            disabled={index > unlockedLevel}
          >
            Level {index + 1}
          </button>
        ))}
      </div>

      {activeLevel !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setActiveLevel(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >✖️</button>
            <h3 className="text-xl font-bold mb-2">Level {activeLevel + 1}</h3>
            <p className="mb-4">{topic.levels[activeLevel]}</p>
            {activeLevel === unlockedLevel && (
            <div>
              <Quiz questionData={topic.quizzes[activeLevel]} onComplete={handleQuizComplete} />
                <a className="text-blue-600 hover:underline font-semibold" href="http://localhost:5000/quiz">quiz</a>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicTemplate;
