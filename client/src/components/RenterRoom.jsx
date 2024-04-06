import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Namenav from "./Namenav";
import AdminButton from "./AdminButton";

const RenterRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <form>
          <input
            type="text"
            className="h-8 rounded-md"
            placeholder="search city or state..."
            onChange={handleSearchInputChange}
          />
        </form>
      </div>
      <h5 style={{ color: "#DFA8E4" }}>All Rooms</h5>

      <div>
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            style={{
              marginBottom: "10px",
              border: "1px solid gray",
              padding: "10px",
            }}
          >
            <h3>{room.name}</h3>
            <p>
              Phone:{" "}
              <span style={{ color: "blue", fontWeight: "bold" }}>
                {room.phone}
              </span>
            </p>
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

export default RenterRoom;
