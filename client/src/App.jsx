/* eslint-disable no-unused-vars */

import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AllRooms from "./pages/AllRooms";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/seller-dashboard" element={<DashBoard />} />
        <Route path="/bookrooms" element={<AllRooms />} />
        <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;

