import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Recommendations from "./pages/Recommendation";
import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  </ThemeProvider>
);

export default App;
