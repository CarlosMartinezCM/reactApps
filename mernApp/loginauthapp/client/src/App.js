import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login"; // Fixed typo in import path
import Home from "./Home"; // Ensure correct path if Home is in components folder
import About from "./components/about";
import Navbar from "./components/Navbar";
import PickEm from "./components/PickEm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    
    <BrowserRouter>
    {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="about" element={<About />} />
        <Route path="PickEm" element={<PickEm />} />
      </Routes>
    </BrowserRouter>
    

  );
}

export default App;
