import React from "react";
import { useSelector } from "react-redux";

const Namenav = () => {
  const userName = useSelector((state) => state.auth.userName);
  console.log(userName);

  return (
    <div className="bg-BT h-12 flex items-center text-white">
      {/* <input
        type="button"
        value="<--"
        className="h-8 w-8 bg-BT cursor-pointer m-2  "
      /> */}
      <div className="flex justify-center items-center w-full">
        <h1 className=" text-center text-xl font-semibold ">
          Hello <span className=" uppercase"> {userName}</span> !
        </h1>
      </div>
    </div>
  );
};

export default Namenav;
