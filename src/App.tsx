import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Root from "./pages/Home";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Article from "./pages/Article";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="project" element={<Project />} />
          <Route path="article" element={<Article />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Router>
  );
}
