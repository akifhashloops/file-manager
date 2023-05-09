import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Character from "./components/character";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </>
  );
}

export default App;
