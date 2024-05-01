import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Namenav = () => {
  const userName = useSelector((state) => state.auth.userName);
  const navigate = useNavigate();

  const logout = () => {
    try {
      window.alert("Successfully logged out");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-BT  flex items-center text-white">
      <div className="flex justify-around items-center w-full px-5">
        <Link to={"/bookrooms"}>
          <img src="Images/logo.png" alt="" className=" h-10 rounded-lg" />
        </Link>
        <h1 className=" text-center text-xl font-semibold ">
          Hello <span className=" uppercase"> {userName}</span> !
        </h1>
        <div>
          <input
            type="button"
            value="Log Out"
            className=" p-2 bg-white border-2 border-white rounded-xl text-BT hover:bg-transparent
                hover:text-white cursor-pointer my-2"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default Namenav;
