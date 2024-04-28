import React, { useState } from "react";
import AddRooms from "./AddRooms";
import LandLordRoom from "./LandLordRoom";

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
    <div className="flex flex-col items-center ">
      <div className="flex justify-evenly m-5">
        <input
          type="button"
          value="ADD"
          className={`h-10 ml-1 px-14 rounded-lg cursor-pointer  ${
            add
              ? "bg-BT text-white font-bold"
              : "bg-background text-white border-background-200 font-normal"
          }`}
          onClick={handleAddClick}
        />

        <input
          type="button"
          value="SHOW"
          className={`h-10 px-14  ml-1 mr-1 rounded-lg cursor-pointer ${
            show
              ? "bg-BT text-white font-bold"
              : "bg-background text-white font-normal"
          }`}
          onClick={handleShowClick}
        />
      </div>
      {add && <AddRooms />}
      {show && <LandLordRoom />}
    </div>
  );
};

export default AdminButton;
