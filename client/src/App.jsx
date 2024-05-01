import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useAuth from "./utils/authUtils";
import RenterRegister from "./pages/RenterRegister";
const DashBoard = React.lazy(() => import("./pages/DashBoard"));
const AllRooms = React.lazy(() => import("./pages/AllRooms"));
const LandLordLogin = React.lazy(() => import("./pages/LandLordLogin"));
const Home = React.lazy(() => import("./pages/Home"));
const LandLordRegister = React.lazy(() => import("./pages/LandLordRegister"));
const ParticularRoom = React.lazy(() => import("./pages/ParticularRoom"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const BookedRoomsPg = React.lazy(() => import("./pages/BookedRoomsPg"));

const App = () => {
  const { checkLocalStorage } = useAuth();

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/landlord-dashboard"
            element={
              <ProtedtedRoutes>
                <DashBoard />
              </ProtedtedRoutes>
            }
          />
          <Route
            path="/bookrooms"
            element={
              <ProtedtedRoutes>
                <AllRooms />
              </ProtedtedRoutes>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <ProtedtedRoutes>
                <ParticularRoom />
              </ProtedtedRoutes>
            }
          />
          <Route
            path="/Booked-rooms"
            element={
              <ProtedtedRoutes>
                <BookedRoomsPg />
              </ProtedtedRoutes>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LandLordLogin />} />
          <Route path="/landlord-register" element={<LandLordRegister />} />
          <Route path="/renter-register" element={<RenterRegister />} />
          <Route path="/homepg" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export function ProtedtedRoutes(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
