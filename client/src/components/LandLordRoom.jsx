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
    <div className="p-5 flex flex-col justify-center items-center gap-5">
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
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className=" border-2 border-BT rounded-xl p-5 m-5 flex flex-col gap-3 font-light "
          >
            <div className="flex gap-1 items-center">
              <h3 className=" font-title font-normal text-BT">Name :</h3>
              <span className="font-light text-sm text-gray-600">
                {room.name}
              </span>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="flex gap-1 items-center">
                <p className=" font-title font-medium text-BT flex items-center gap-1">
                  <BsTelephone /> :
                </p>
                <span className="font-light text-sm text-gray-600">
                  {room.phone}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <p className=" font-title font-normal text-BT">Address:</p>
                <span className="font-light text-sm text-gray-600">
                  {room.address}
                </span>
              </div>
              <div className=" flex justify-between ">
                <div className="flex gap-1 items-center">
                  <p className=" font-title font-normal text-BT">City:</p>
                  <span className="font-light text-sm text-gray-600">
                    {room.city}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <p className=" font-title font-normal text-BT">State :</p>
                  <span className="font-light text-sm text-gray-600">
                    {room.state}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className=" flex gap-2 items-center">
                  <p className=" font-title font-normal text-BT">Rent:</p>
                  <span className="font-light text-sm text-gray-600">
                    ₹{room.rent}
                  </span>
                </div>
                <div className=" flex gap-2 items-center">
                  <p className=" font-title font-normal text-BT flex items-center gap-2">
                    <BsFillPeopleFill />:
                  </p>
                  <span className="font-light text-sm text-gray-600">
                    {room.numOfGuest} guest
                  </span>
                </div>
              </div>
              <div className=" font-title font-normal text-BT">
                Your room description :{" "}
                <span className="font-light text-sm text-gray-600">
                  {room.description}
                </span>
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
                      key={index}
                      src={`http://localhost:3000/${image}`}
                      alt={`${index + 1}`}
                      className=" bg-contain p-5 w-full"
                    />
                  ))}
                </Slider>
              )}
              <div className="flex">
                <button
                  className=" px-5 py-1 bg-red-600 text-white m-5 rounded-md"
                  onClick={() => onClickDeleteRoom(room._id)}
                >
                  Delete
                </button>
                <button
                  className="px-5 py-1 bg-blue-600 text-white m-5 rounded-md"
                  onClick={() => {
                    setSelectedRoomId(room._id);
                    setShowUpdate(true);
                  }}
                >
                  Update
                </button>
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
            images={
              filteredRooms.find((room) => room._id === selectedRoomId).images
            }
          />
        </div>
      )}
    </div>
  );
};

export default RenterRoom;
