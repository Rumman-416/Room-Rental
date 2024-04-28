import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-evenly m-5">
      <Link to="/login ">
        <input
          type="button"
          value="Login pg"
          className="h-10 w-20 bg-yellow-500"
        />
      </Link>
      <Link to="/landlord-dashboard">
        <input
          type="button"
          value="Dashboard"
          className="h-10 w-20 bg-yellow-500"
        />
      </Link>
      <Link to="/bookrooms">
        <input
          type="button"
          value="allrooms"
          className="h-10 w-20 bg-yellow-500"
        />
      </Link>
    </div>
  );
};

export default Home;
