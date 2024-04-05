import React, { useState, useEffect } from "react";
import axios from "axios";

const RenterRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRenterRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/renter");

        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching renter rooms:", error);
      }
    };

    fetchRenterRooms();
  }, []);

  return (
    <div>
      <h2>Renter's Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <p>Name: {room.name}</p>
            <p>Address: {room.address}</p>
            {/* Render other room details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenterRoom;
