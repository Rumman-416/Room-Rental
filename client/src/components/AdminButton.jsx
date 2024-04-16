import React, { useState } from "react";
import AddRooms from "./AddRooms";
import RenterRoom from "./RenterRoom";
import backgroundImage from "../assets/images/dashboard.jpg"; // Import your background image

const AdminButton = () => {
  const [add, setAdd] = useState(true);
  const [show, setShow] = useState(false);

  const handleAddClick = () => {
    setAdd(true);
    setShow(false);
  };

  const handleShowClick = () => {
    setAdd(false);
    setShow(true);
  };

  return (
    <div className="flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex justify-evenly m-5">
        <input
          type="button"
          value="ADD"
          className={`h-10 ml-1 px-14 rounded-lg cursor-pointer  ${
            add ? "bg-BT text-black " : "bg-background text-black border-background-200 "
          }`}
          onClick={handleAddClick}
        />

        <input
          type="button"
          value="SHOW"
          className={`h-10 px-14  ml-1 mr-1 rounded-lg cursor-pointer ${
            show ? "bg-BT text-black " : "bg-background text-black "
          }`}
          onClick={handleShowClick}
        />
      </div>
      {add && <AddRooms />}
      {show && <RenterRoom />}
    </div>
  );
};

export default AdminButton;