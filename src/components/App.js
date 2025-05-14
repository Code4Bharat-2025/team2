// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopicSelectionPage from "./TopicSelectionPage";
import TopicPage from "./TopicPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopicSelectionPage />} />
        <Route path="/learn/:topicId" element={<TopicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
