import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Project from "./Project";
import Article from "./Article";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/article" element={<Article />} />
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Router>
  );
}
