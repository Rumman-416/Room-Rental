import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useAuth from "./utils/authUtils";
import DashBoard from "./pages/DashBoard";
import AllRooms from "./pages/AllRooms";
import RenterLogin from "./pages/RenterLogin";
import Home from "./pages/Home";
import RenterRegister from "./pages/RenterRegister";
import ParticularRoom from "./pages/ParticularRoom";

const App = () => {
  const { checkLocalStorage } = useAuth();

  useEffect(() => {
    checkLocalStorage();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<RenterLogin />} />
        <Route path="/register" element={<RenterRegister />} />
        <Route path="/renter-dashboard" element={<DashBoard />} />
        <Route path="/bookrooms" element={<AllRooms />} />
        <Route path="/room/:roomId" element={<ParticularRoom />} />
      </Routes>
    </>
  );
};

export default App;
