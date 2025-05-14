// TopicTemplate.js
import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";

function TopicTemplate({ topic }) {
  const [unlockedLevel, setUnlockedLevel] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

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
    setShowQuiz(false);
  };

  const resetProgress = () => {
    localStorage.removeItem(`progress_${topic.id}`);
    setUnlockedLevel(0);
    setShowQuiz(false);
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

      <div className="space-y-4">
        {topic.levels.map((text, index) => (
          <div key={index} className={`p-4 rounded-lg shadow ${index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-blue-100' : 'bg-green-100'} ${index > unlockedLevel ? 'opacity-50 blur-sm' : ''}`}>
            Level {index + 1}: {index > unlockedLevel ? 'Locked 🔒' : text}
          </div>
        ))}
        {unlockedLevel < topic.levels.length && !showQuiz && (
          <div className="mt-6">
            <button className="btn btn-primary" onClick={() => setShowQuiz(true)}>Take Quiz for Level {unlockedLevel + 1}</button>
          </div>
        )}
        {showQuiz && <Quiz questionData={topic.quizzes[unlockedLevel]} onComplete={handleQuizComplete} />}
      </div>
    </div>
  );
}

export default TopicTemplate;
