import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Ensure this is imported!

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default Approutes;
