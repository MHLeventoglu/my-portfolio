import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Portfolio } from "./Portfolio.jsx";
import { AdminPanel } from "./components/admin/AdminPanel.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
