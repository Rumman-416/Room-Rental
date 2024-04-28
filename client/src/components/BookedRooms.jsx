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
  }, [userId]);

  return (
    <div>
      <h2>Booked Rooms</h2>
      <div>
        {bookedRooms.map((room) => (
          <div key={room._id} className=" p-5 bg-slate-100 m-1 shadow-lg my-4">
            <Link to={`/room/${room._id}`}>
              <div className=" w-[20rem] h-[12rem] relative overflow-hidden ">
                <img
                  src={`http://localhost:3000/${room.images[0]}`}
                  className=" w-full  bg-contain rounded-lg "
                />
              </div>
              <h3>{room.name}</h3>
              <p>Rent: {room.rent}</p>
              <p>
                From Date:{" "}
                {new Date(room.bookedFrom).toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                To Date:{" "}
                {new Date(room.bookedTo).toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Link>
            <CancelBooking roomId={room._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedRooms;
