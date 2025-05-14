// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopicSelectionPage from "./TopicSelectionPage";
import TopicPage from "./TopicPage";
import BudgetTool from "./BudgetTool";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex justify-between items-center text-white shadow-md">
      <h1 className="text-xl font-bold">💸 Smart Money Quest</h1>
      <Link to="/" className="btn btn-sm bg-white text-purple-700 hover:bg-purple-100">🏠 Home</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TopicSelectionPage />} />
        <Route path="/learn/:topicId" element={<TopicPage />} />
        <Route path="/tool/budget" element={<BudgetTool />} />
      </Routes>
    </Router>
  );
}

export default App;
