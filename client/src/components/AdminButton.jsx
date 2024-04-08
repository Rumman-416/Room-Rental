import React, { useState } from "react";
import AddRooms from "./AddRooms";
import RenterRoom from "./RenterRoom";

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
    <div>
      <div className="flex justify-evenly m-5">
        <input
          type="button"
          value="ADD"
          className="h-10 bg-[#DFA8E4] w-44 rounded-lg cursor-pointer"
          onClick={handleAddClick}
        />

        <input
          type="button"
          value="SHOW"
          className="h-10 bg-[#DFA8E4] w-44 rounded-lg cursor-pointer"
          onClick={handleShowClick}
        />
      </div>
      <div>{add ? <AddRooms /> : <></>}</div>
      <div>{show ? <RenterRoom /> : <></>}</div>
    </div>
  );
};

export default AdminButton;
