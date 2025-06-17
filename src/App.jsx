import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivityPage from "./Components/Activity/ActivityPage";
import Home from "./Components/HomePage/Home";
import ActivityPhotos from "./Components/Activity/ActivityPhotos";
import Web from "./Components/Web";
import Awards from "./Components/Award/Awards";

import HomePage from "./Components/HomePage/HomePage";

export default function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/Web" element={<Web />} />
          <Route path="/Japanese" element={<Web />} />
          <Route path="/Activity" element={<ActivityPage />} />
          <Route path="/Activity/Photos" element={<ActivityPhotos />} />
        </Routes>
      </Router>
    </>
  );
}
