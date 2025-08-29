import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Portfolio } from "./Portfolio.jsx";
import { AdminPanel } from "./components/admin/AdminPanel.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;