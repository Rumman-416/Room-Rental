/* eslint-disable no-unused-vars */

import React from "react";
import AddRooms from "../components/AddRooms";
import Namenav from "../components/Namenav";
import AdminButton from "../components/AdminButton";

const DashBoard = () => {
  return (
    <div>
      <Namenav/>
      <AdminButton/>
      <AddRooms />
    </div>
  );
};

export default DashBoard;
