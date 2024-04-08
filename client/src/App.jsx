import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useAuth from "./utils/authUtils";
import DashBoard from "./pages/DashBoard";
import AllRooms from "./pages/AllRooms";
<<<<<<< HEAD
import HomePage from "./pages/HomePage";
=======
import RenterLogin from "./pages/RenterLogin";
import Home from "./pages/Home";
import RenterRegister from "./pages/RenterRegister";
import ParticularRoom from "./pages/ParticularRoom";

>>>>>>> a7bc0e27805161c3ba7983faa1f8b12ddac7ad7a
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
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/room/:roomId" element={<ParticularRoom />} />
        <Route path="/rooms" element={<ParticularRoom />} />
      </Routes>
    </>
  );
};

export default App;