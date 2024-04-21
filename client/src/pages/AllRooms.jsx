import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
    autoplaySpeed: 3000,
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" bg-slate-100 ">
      <Navbar />
      <div className=" bg-white">
        <div className=" border-b-2 border-BT flex h-8 items-center mx-3 px-4">
          <input
            type="text"
            className="h-full w-full  focus:outline-none"
            placeholder="search city or state..."
            onChange={handleSearchInputChange}
          />
          <FaSearch className="text-2xl text-BT bg-white" />
        </div>
      </div>

      <div className=" grid grid-cols-1 py-3">
        {filteredRooms.map((room) => (
          <div key={room._id} className=" shadow-2xl rounded-3xl m-3 ">
            <Link to={`/room/${room._id}`}>
              {room.images && room.images.length <= 1 ? (
                <div className="w-full h-[10rem] relative overflow-hidden ">
                  <img
                    src={`http://localhost:3000/${room.images[0]}`}
                    className=" w-full  bg-contain rounded-lg "
                  />
                </div>
              ) : (
                <Slider
                  {...settings}
                  className=" w-full h-[25vh] relative overflow-hidden rounded-t-3xl"
                >
                  {room.images.map((image, index) => (
                    <img
                      src={`http://localhost:3000/${image}`}
                      alt={`${index + 1}`}
                      className=" bg-contain  w-full"
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
                  <div className=" flex items-center gap-1">
                    <FaStar className=" text-BT" /> 4.8
                  </div>
                </div>
                <div className=" flex items-center gap-1">
                  <BsFillPeopleFill className=" text-BT" /> {room.numOfGuest}
                  <span> guest</span>
                </div>
                <div className="flex flex-row">
                  <p>₹ </p>
                  <p className="font-bold">
                    {room.rent} <span className=" font-normal"> night</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
