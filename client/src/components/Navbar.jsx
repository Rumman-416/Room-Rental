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
    <div className=" bg-white sticky top-0 lg:static z-50">
      {isScroller ? (
        <div className="flex justify-between items-center p-3 bg-white ">
          <CiMenuBurger className="h-8 w-8" onClick={toggleNav} />

          <img src="/Images/logo.png" alt="" className="h-12" />
          <div className="flex items-center">
            <Link>
              <AiOutlineMail className="h-7 w-7 font-light hover:text-[#ffc107]" />
            </Link>
            <BiDotsVertical
              className="h-8 w-7 font-thin"
              onClick={toggleNav2}
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
                <Link to="/">
                  <li className="uppercase bg bg-red-200 p-2">Home</li>
                </Link>
                <Link to={"/about-us"}>
                  <li className="uppercase p-2">About Us</li>
                </Link>

                <li className="uppercase p-2 relative" onClick={toggleServices}>
                  <span className=" flex justify-between items-center">
                    <span> Services</span>
                    <IoIosArrowDown
                      className={`h-4 w-4 transition-all duration-500 text-[#ffc107] ${
                        services ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                  <ul
                    className={`absolute top-full left-0 bg-white w-64 ${
                      services ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <li className="p-2 uppercase text-sm font-light">
                      website development
                    </li>
                    <li className="p-2 uppercase text-sm font-light">seo</li>
                    <li className="p-2 uppercase text-sm font-light">smm</li>
                    <li className="p-2 uppercase text-sm font-light">ppc</li>
                    <li className="p-2 uppercase text-sm font-light">
                      mobile app development
                    </li>
                    <li className="p-2 uppercase text-sm font-light">
                      media buying
                    </li>
                  </ul>
                </li>
                <Link to="/clientele">
                  <li className={`uppercase p-2${services ? " mt-36" : ""}`}>
                    Clientele
                  </li>
                </Link>
                <Link to={"/blog"}>
                  <li className="uppercase p-2">Blog</li>
                </Link>
                <Link to={"/contact-us"}>
                  <li className="uppercase p-2">Contact us</li>
                </Link>
              </ul>
            )}
          </div>
          {/* <div
              className={`absolute top-full right-0 h-[100vh] w-64 transition-all duration-500 ${
                nav2
                  ? " bg-white h-[100vh] w-64 shadow-md"
                  : " pointer-events-none right-[-1vw]"
              }`}
            >
              {nav2 && <div></div>}
            </div> */}
        </div>
      ) : (
        <div className=" bg-white ">
          <nav className="flex justify-between items-center px-[4rem] py-[1rem] ">
            <img
              src="https://www.socialtitli.com/assets/images/logo.png"
              alt=""
              className=" h-[5rem]"
            />
            <div className=" flex items-center gap-6">
              <Link to={"/"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  home
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
              <Link to={"/clientele"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  clientele
                </h1>
              </Link>
              <Link to={"/blog"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  blog
                </h1>
              </Link>
              <Link to={"/contact-us"}>
                <h1 className=" uppercase font-semibold hover:text-[#f4a210] transition-all duration-300">
                  contact us
                </h1>
              </Link>
            </div>
            <div className=" flex gap-3">
              <AiOutlineMail className=" text-3xl" />
              <HiOutlineMenuAlt2 className=" text-3xl " onClick={toggleNav2} />
            </div>
          </nav>
          {/* <div
              className={`absolute top-full right-0 h-[100vh] w-64 transition-all duration-500 ${
                nav2
                  ? " bg-white h-[100vh] w-64 shadow-md"
                  : " pointer-events-none right-[-1vw]"
              }`}
            >
              {nav2 && <div></div>}
            </div> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
