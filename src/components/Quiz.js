// Quiz.js
import React, { useState } from "react";

function Quiz({ questionData, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === questionData.answer) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
      <p className="font-semibold">{questionData.question}</p>
      {questionData.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => setSelected(idx)}
          className={`block w-full text-left p-2 rounded border ${selected === idx ? 'bg-blue-200' : 'bg-gray-100'}`}
        >{opt}</button>
      ))}
      <button className="btn btn-primary mt-2" onClick={handleSubmit}>Submit Answer</button>
      {submitted && selected !== questionData.answer && <p className="text-red-500 mt-1">❌ Incorrect. Try again!</p>}
      {submitted && selected === questionData.answer && <p className="text-green-600 mt-1">✅ Correct!</p>}
    </div>
  );
}

export default Quiz;
