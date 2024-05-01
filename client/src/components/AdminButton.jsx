import React, { useEffect, useState } from "react";
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

  const [ld, setLd] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setLd(window.innerWidth <= 1024);
    };

    // Set initial size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {ld ? (
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
      ) : (
        <div className="flex w-full justify-center">
          <AddRooms />
          <LandLordRoom />
        </div>
      )}
    </>
  );
};

export default AdminButton;
