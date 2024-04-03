/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Namenav from "../components/Namenav";
import AdminButton from "../components/AdminButton";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Namenav/>
      <AdminButton/>
      <h5 style={{ color:'#DFA8E4' }}>All Rooms</h5>
      <div>
        {/* Render each room's information */}
        {rooms.map((room) => (
          <div key={room._id} style={{ marginBottom: "10px", border: "1px solid gray", padding: "10px" }}>
            <h3>{room.name}</h3>
            <p>Phone: <span style={{ color: "blue", fontWeight: "bold" }}>{room.phone}</span></p>
            <p>Address: {room.address}</p>
            <p>City: {room.city}</p>
            <p>State: {room.state}</p>
            <p>Rent: {room.rent}</p>
            <p>Number of Guests: {room.numOfGuest}</p>
            {/* Render images if available */}
            {room.images && (
              <div>
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Room ${index + 1}`}
                    className="h-20 w-36"
                    style={{ marginTop: "10px" }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
