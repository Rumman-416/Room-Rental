import React from "react";
import { Link } from "react-router-dom";

const AdminButton = () => {
  return (
    <div className="flex justify-evenly m-5">
      <Link to="/renter-DashBoard">
        <input
          type="button"
          value="ADD"
          className=" h-10 bg-[#DFA8E4] w-44 rounded-lg cursor-pointer"
        />
      </Link>
      <Link to="/bookrooms">
        <input
          type="button"
          value="SHOW"
          className=" h-10 bg-[#DFA8E4] w-44 rounded-lg cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default AdminButton;
