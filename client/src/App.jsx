import React from "react";
import Navbar from "./layout/navbar/Navbar";
import Footer from "./layout/footer/Footer";
import Approutes from "./routes/Approutes";

export default function App() {
  return (
    <>
      <Navbar />
      <Approutes />
      <Footer />
    </>
  );
}
