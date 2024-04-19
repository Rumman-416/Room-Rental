import React from "react";
import { useSelector } from "react-redux";

const Namenav = () => {
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div className="bg-BT h-12 flex items-center">
      <input
        type="button"
        value="<--"
        className="h-8 w-8 bg-BT cursor-pointer m-2  "
      />
      <span className="text-center text-xl flex-1 text-brandPrimary">
        Hello {userName} !
      </span>
    </div>
  );
};

export default Namenav;
