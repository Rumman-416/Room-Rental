import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { BiDotsVertical } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [nav2, setNav2] = useState(false);
  const [services, setServices] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const toggleNav2 = () => {
    setNav2(!nav2);
  };

  const toggleServices = () => {
    setServices(!services);
  };
  const [isScroller, setIsScroller] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsScroller(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className=" bg-white sticky top-0 z-50">
      {isScroller ? (
        <div className="flex justify-between items-center p-3 bg-white ">
          <CiMenuBurger className="h-8 w-8" onClick={toggleNav} />
          <Link to="/bookrooms">
            <img
              src="/Images/logo.png"
              alt=""
              className="h-12 cursor-pointer"
            />
          </Link>
          <div className="flex items-center">
            <input
              type="button"
              value="Log Out"
              className=" p-2 bg-BT border-2 border-BT rounded-xl text-white hover:bg-transparent
                hover:text-BT "
            />
          </div>
          <div
            className={`absolute top-full left-0 h-[100vh] w-64 transition-all duration-500 ${
              nav
                ? " bg-white h-[100vh] w-64 shadow-md"
                : " pointer-events-none left-[-100vw]"
            }`}
          >
            {nav && (
              <ul className="py-4 font-medium text-sm">
                <Link to="/bookrooms">
                  <li className="uppercase bg p-2">Home</li>
                </Link>
                <Link to={"/about-us"}>
                  <li className="uppercase p-2">About Us</li>
                </Link>
                <Link to={"/services"}>
                  <li className="uppercase p-2">services</li>
                </Link>
                <Link to={"/renter-dashboard"}>
                  <li className="uppercase p-2">Dashboard</li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className=" bg-white sticky top-0">
          <nav className="flex justify-between items-center px-[4rem] py-[1rem] ">
            <Link to="/bookrooms">
              <img
                src="/Images/logo.png"
                alt=""
                className="h-[4rem] cursor-pointer"
              />
            </Link>
            <div className=" flex items-center gap-6">
              <Link to={"/bookrooms"}>
                <h1 className="uppercase font-semibold hover:text-BT transition-all duration-300">
                  Search Rooms
                </h1>
              </Link>
              <Link to={"/about-us"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  about us
                </h1>
              </Link>
              <Link to={"/services"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  services
                </h1>
              </Link>
              <Link to={"/renter-dashboard"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  Dashboard
                </h1>
              </Link>
            </div>
            <div>
              <input
                type="button"
                value="Log Out"
                className=" p-3 bg-BT border-2 border-BT rounded-xl text-white hover:bg-transparent
                hover:text-BT "
              />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
