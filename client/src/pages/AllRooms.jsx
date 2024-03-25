import React, { useState, useEffect } from "react";
import axios from "axios";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from the backend when the component mounts
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms(); // Call the fetchRooms function
  }, []); // Empty dependency array ensures that this effect runs only once after initial render

  return (
    <div>
      <h2>All Rooms</h2>
      <div>
        {/* Render each room's information */}
        {rooms.map((room) => (
          <div key={room._id}>
            <h3>{room.name}</h3>
            <p>Phone: {room.phone}</p>
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
                    src={`http://localhost:3000/${image}`}
                    alt={`Room ${index + 1}`}
                    style={{ maxWidth: "200px" }}
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
