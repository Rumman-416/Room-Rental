import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateForm from "./UpdateForm";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiPencilLineDuotone } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const RenterRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // State to store selected room id
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchRenterRooms = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/dashboard/landlord",
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

  const handleUpdateSuccess = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/${selectedRoomId}`
      );
      // Find the index of the updated room in the rooms array
      const updatedRoomIndex = rooms.findIndex(
        (room) => room._id === selectedRoomId
      );
      // Create a new array with updated room details
      const updatedRooms = [...rooms];
      updatedRooms[updatedRoomIndex] = response.data;
      // Update state with the new room details
      setRooms(updatedRooms);
      // Close the update form
      setShowUpdate(false);
    } catch (error) {
      console.error("Error fetching updated room details:", error);
      // Handle the error here if necessary
    }
  };

  return (
    <div className="p-5 flex flex-col justify-start w-full items-center gap-5 xl:w-6/12">
      <div className=" p-1 gap-2 w-11/12 rounded-xl border-2 border-BT flex items-center">
        <FaSearch className="text-BT" />
        <input
          type="text"
          placeholder="search City or State..."
          onChange={handleSearchInputChange}
          className="focus:border-none focus:outline-none "
        />
      </div>
      <h5 className=" text-black text-2xl">Your Rooms</h5>
      <div className="flex flex-col gap-2">
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className=" border-2 border-BT rounded-xl  w-[90vw] flex sm:w-[75vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] items-center font-light p-2 gap-2"
          >
            {room.images && room.images.length <= 1 ? (
              <div className=" w-[4rem] h-[3rem] relative overflow-hidden ">
                <img
                  src={`http://localhost:3000/${room.images[0]}`}
                  className=" w-full  bg-contain  "
                />
              </div>
            ) : (
              <Slider
                {...settings}
                className=" w-[4rem] h-[3rem] relative overflow-hidden"
              >
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/${image}`}
                    alt={`${index + 1}`}
                    className=" bg-contain  w-full"
                  />
                ))}
              </Slider>
            )}
            <div className=" lp:flex justify-between w-10/12 sm:w-full">
              <Link to={`/room/${room._id}`}>
                <div>
                  <div className="flex gap-1 items-center  ">
                    <h3 className=" font-title font-normal text-BT">Name :</h3>
                    <span className="font-light text-xs text-gray-600">
                      {room.name}
                    </span>
                  </div>
                  <div className=" flex flex-col justify-between ">
                    <div className="flex gap-1 items-center">
                      <p className=" font-title font-normal text-BT">City:</p>
                      <span className="font-light text-xs text-gray-600">
                        {room.city}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className=" font-title font-normal text-BT">State :</p>
                      <span className="font-light text-xs text-gray-600">
                        {room.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-[12rem] mp:w-[15rem] lg:w-[20rem]">
                    <div className=" flex gap-1 items-center justify-center">
                      <p className=" font-title font-normal text-BT">Rent:</p>
                      <span className="font-light text-xs text-gray-600">
                        ₹{room.rent}
                      </span>
                    </div>
                    <div className=" flex gap-1 items-center justify-center">
                      <p className=" font-title font-normal text-BT flex items-center gap-1">
                        <BsFillPeopleFill />:
                      </p>
                      <span className="font-light text-xs text-gray-600">
                        {room.numOfGuest} guest
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className=" flex  justify-end items-center gap-1 lg:gap-5">
                <RiDeleteBinLine
                  className="  text-red-600 text-xl"
                  onClick={() => onClickDeleteRoom(room._id)}
                />

                <PiPencilLineDuotone
                  className=" text-blue-600  text-xl"
                  onClick={() => {
                    setSelectedRoomId(room._id);
                    setShowUpdate(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {showUpdate && (
        <div className="update-form-popup">
          <UpdateForm
            id={selectedRoomId}
            closeForm={() => setShowUpdate(false)}
            onUpdateSuccess={handleUpdateSuccess}
            // images={
            //   filteredRooms.find((room) => room._id === selectedRoomId).images
            // }
          />
        </div>
      )}
    </div>
  );
};

export default RenterRoom;
