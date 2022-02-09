import React from "react";
import ReactDOM from "react-dom";
import { Navbar } from "./components/Navbar";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { Surah } from "./pages/Surah";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { PrayTime } from "./pages/PrayTime";
export const Root = () => {
  return (
    <div className=" d-flex justify-content-center">
      <div className="w-75 p-3 ">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/praytime" element={<PrayTime />} />

            <Route path="/surah/:id" element={<Surah />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
