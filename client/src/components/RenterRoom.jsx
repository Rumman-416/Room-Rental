import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateForm from "./UpdateForm";
import { BsTelephone } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

const RenterRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchRenterRooms = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/dashboard/renter",
          { userId }
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRenterRooms();
  }, [userId]); // Fetch rooms whenever userId or token changes

  //  delete rooms
  const onClickDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:3000/dashboard/${roomId}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      window.alert("Room deleted");
    } catch (error) {
      console.log("delete room error", error);
    }
  };

  //search for rooms
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-5 flex flex-col justify-center items-center gap-5">
      <div className="h-8 px-2 gap-2  rounded-md border-2 border-BT flex items-center">
        <FaSearch className="text-BT" />
        <input
          type="text"
          placeholder="search City or State..."
          onChange={handleSearchInputChange}
          className="ocus:border-none focus:outline-none"
        />
      </div>
      <h5 className=" text-black text-2xl">Your Rooms</h5>

      <div>
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className=" border-2 border-[#eca63c] rounded-xl p-5 m-5 flex flex-col gap-1 font-light"
          >
            <div className="flex gap-1">
              <h3 className=" font-title font-normal text-[#eca63c]">Name :</h3>
              <span> {room.name}</span>
            </div>
            <div className=" flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className=" font-title font-medium text-[#eca63c] flex items-center gap-1">
                  <BsTelephone /> :
                </p>
                <span>{room.phone}</span>
              </div>
              <div className="flex gap-1">
                <p className=" font-title font-normal text-[#eca63c]">
                  Address:
                </p>
                <span> {room.address}</span>
              </div>
              <div className=" flex justify-between">
                <div className="flex gap-1">
                  <p className=" font-title font-normal text-[#eca63c]">
                    City:
                  </p>
                  <span>{room.city}</span>
                </div>
                <div className="flex gap-1">
                  <p className=" font-title font-normal text-[#eca63c]">
                    State :
                  </p>
                  <span>{room.state}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className=" flex gap-2">
                  <p className=" font-title font-normal text-[#eca63c]">
                    Rent:
                  </p>
                  <span>{room.rent}</span>
                </div>
                <div className=" flex gap-2">
                  <p className=" font-title font-normal text-[#eca63c] flex items-center gap-2">
                    <BsFillPeopleFill />:
                  </p>
                  <span>{room.numOfGuest}</span>
                </div>
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
              {room.images && room.images.length <= 1 ? (
                <div className=" w-[20rem] h-[12rem] relative overflow-hidden p-5">
                  <img
                    src={`http://localhost:3000/${room.images[0]}`}
                    className=" w-full  bg-contain rounded-lg "
                  />
                </div>
              ) : (
                <Slider
                  {...settings}
                  className=" w-[20rem] h-[12rem] relative overflow-hidden"
                >
                  {room.images.map((image, index) => (
                    <img
                      src={`http://localhost:3000/${image}`}
                      alt={`${index + 1}`}
                      className=" bg-contain p-5 w-full"
                    />
                  ))}
                </Slider>
              )}
              <div className="flex">
                <button
                  className=" h-8 w-20 px-1 bg-red-600 text-white m-5"
                  onClick={() => onClickDeleteRoom(room._id)}
                >
                  Delete
                </button>
                <UpdateForm rooomId={room._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenterRoom;
