import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CancelBooking from "./CancelBooking";

const BookedRooms = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/booked-rooms",
          {
            id: userId,
          }
        );
        const bookedRoomIds = response.data.bookedrooms;
        console.log("Booked room IDs:", bookedRoomIds);

        // Fetch room details for each booked room ID
        const roomDetailsPromises = bookedRoomIds.map((roomId) =>
          axios.get(`http://localhost:3000/dashboard/${roomId}`)
        );

        const roomDetailsResponses = await Promise.all(roomDetailsPromises);
        const bookedRoomsData = roomDetailsResponses.map(
          (response) => response.data
        );
        console.log("Booked rooms data:", bookedRoomsData);

        setBookedRooms(bookedRoomsData);
      } catch (error) {
        console.error("Error fetching booked rooms:", error);
      }
    };

    if (userId) {
      fetchBookedRooms();
    }
  }, [bookedRooms]);

  return (
    <div className=" mx-10 min-h-[90vh]">
      <h2>Booked Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3 m-5 lp:mx-10 sm:mx-28 md:mx-8 lg:mx-10 xl:mx-20">
        {bookedRooms.map((room) => (
          <div
            key={room._id}
            className=" shadow-lg rounded-3xl md:m-3 hover:shadow-2xl transition-all duration-300 xl:mx-5 "
          >
            <Link to={`/room/${room._id}`}>
              <div className="w-full h-[13rem] lp:h-[16rem] relative overflow-hidden ">
                <img
                  src={`http://localhost:3000/${room.images[0]}`}
                  className="w-screen  bg-contain rounded-t-3xl h-[14rem] lp:h-[16rem]"
                />
              </div>
              <div className=" p-3">
                <h3>{room.name}</h3>
                <p>Rent: {room.rent}</p>
                <p>
                  Check In Date:{" "}
                  {new Date(room.bookedFrom).toLocaleDateString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  Check Out Date:{" "}
                  {new Date(room.bookedTo).toLocaleDateString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
            <CancelBooking roomId={room._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedRooms;
