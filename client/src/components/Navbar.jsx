import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [services, setServices] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setNav(!nav);
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
              onClick={logout}
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
                <Link to={"/Booked-rooms"}>
                  <li className="uppercase p-2">Rooms booked</li>
                </Link>
                <Link to={"/services"}>
                  <li className="uppercase p-2">services</li>
                </Link>
                <Link to={"/landlord-dashboard"}>
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
              <Link to={"/Booked-rooms"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  Rooms Booked
                </h1>
              </Link>
              <Link to={"/services"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  services
                </h1>
              </Link>
              <Link to={"/landlord-dashboard"}>
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
                onClick={logout}
              />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
