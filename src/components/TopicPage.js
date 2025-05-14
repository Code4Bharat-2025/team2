// TopicPage.js
import React from "react";
import { useParams } from "react-router-dom";
import topicData from "../topics";
import TopicTemplate from "./TopicTemplate";

function TopicPage() {
  const { topicId } = useParams();
  const topic = topicData.find(t => t.id === topicId);
  if (!topic) return <div className="p-4 text-red-500">Topic not found</div>;
  return <TopicTemplate topic={topic} />;
}

export default TopicPage;
