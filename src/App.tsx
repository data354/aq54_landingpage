import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Root from "./Home";
import { Home } from "./Home";
import Project from "./Project";
import Article from "./Article";

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
