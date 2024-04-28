import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdAlert } from "react-icons/io";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useWindowSize();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard");
        console.log(response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" bg-slate-100 ">
      <Navbar />
      <div className=" bg-slate-100 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className=" border-b-2 border-BT flex h-8 items-center mx-3 px-4 lg:w-10/12 my-4">
          <input
            type="text"
            className="h-full w-full bg-slate-100  focus:outline-none "
            placeholder="search city or state..."
            onChange={handleSearchInputChange}
          />
          <FaSearch className="text-2xl text-BT bg-slate-100" />
        </div>
      </div>
      <div className=" min-h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3 m-5 lp:mx-10 sm:mx-28 md:mx-8 lg:mx-10 xl:mx-20">
          {currentItems.map((room) => {
            // Calculate average rating
            const ratings = room.reviews.map((review) => review.rating);
            const averageRating =
              ratings.length > 0
                ? ratings.reduce((acc, curr) => acc + curr) / ratings.length
                : 0;

            return (
              <div
                key={room._id}
                className=" shadow-lg rounded-3xl md:m-3 hover:shadow-2xl transition-all duration-300 xl:mx-5"
              >
                <Link to={`/room/${room._id}`}>
                  {room.images && room.images.length <= 1 ? (
                    <div className="w-full h-[13rem] lp:h-[16rem] relative overflow-hidden">
                      <img
                        src={`http://localhost:3000/${room.images[0]}`}
                        className=" w-screen  bg-contain rounded-t-3xl h-[14rem] lp:h-[16rem]"
                      />
                    </div>
                  ) : (
                    <Slider
                      {...settings}
                      className=" w-full h-[13rem] lp:h-[16rem] relative overflow-hidden rounded-t-3xl"
                    >
                      {room.images.map((image, index) => (
                        <img
                          src={`http://localhost:3000/${image}`}
                          alt={`${index + 1}`}
                          className=" bg-contain w-screen rounded-t-3xl h-[14rem] lp:h-[16rem]"
                          key={index}
                        />
                      ))}
                    </Slider>
                  )}
                  <div className=" p-4">
                    <div className=" flex justify-between">
                      <div className="flex justify-start gap-1">
                        {/* <h3 className="font-bold text-xl">{room.name}</h3> */}
                        <p>{room.city} ,</p>
                        <p> {room.state}</p>
                      </div>
                      {ratings.length > 0 ? (
                        <div className=" flex items-center gap-1">
                          <FaStar className=" text-BT" />{" "}
                          {averageRating.toFixed(1)}
                        </div>
                      ) : (
                        <div className=" text-sm font-light text-BT">
                          No Reviews Yet
                        </div>
                      )}
                    </div>
                    <div className=" flex items-center gap-1">
                      <BsFillPeopleFill className=" text-BT" />{" "}
                      {room.numOfGuest}
                      <span> guest</span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className=" flex gap-1">
                        <p>₹ </p>
                        <p className="font-bold">
                          {room.rent}{" "}
                          <span className=" font-normal"> night</span>
                        </p>
                      </div>
                      <div>
                        {room.booked ? (
                          <div className=" flex bg-BT justify-between p-1 text-white items-center gap-2 rounded-md">
                            <IoMdAlert />
                            Booked
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredRooms.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav>
      <ul className="flex justify-center mt-4">
        {Array.from({ length: pageNumbers }, (_, i) => i + 1).map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className="px-3 py-1 bg-BT text-white rounded-md hover:bg-transparent border-2 border-BT hover:text-black"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const useWindowSize = () => {
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const getWindowSize = () => {
  const { innerWidth } = window;
  if (innerWidth < 640) {
    return 10; // Phone screen
  } else if (innerWidth < 1024) {
    return 20; // Tablet
  } else if (innerWidth < 1440) {
    return 30; // Laptop
  } else {
    return 30; // Monitor
  }
};

export default AllRooms;
