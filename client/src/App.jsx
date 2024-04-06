import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useAuth from "./utils/authUtils";
import DashBoard from "./pages/DashBoard";
import AllRooms from "./pages/AllRooms";
import RenterLogin from "./pages/RenterLogin";
import Home from "./pages/Home";
import RenterRegister from "./pages/RenterRegister";
// import RenterRoom from "./components/RenterRoom";
// import AddRooms from "./components/AddRooms";

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
      </Routes>
    </>
  );
};

export default App;
