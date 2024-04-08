import React, { useState, useEffect } from "react";
import axios from "axios";

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
<<<<<<< HEAD
        {}
        {rooms.map((room) => (
          <div key={room._id} style={{ marginBottom: "10px", border: "1px solid gray", padding: "10px" }}>
            <h3>{room.name}</h3>
            <p>Phone: <span style={{ color: "blue", fontWeight: "bold" }}>{room.phone}</span></p>
            <p>Address: {room.address}</p>
            <p>City: {room.city}</p>
            <p>State: {room.state}</p>
            <p>Rent: {room.rent}</p>
            <p>Number of Guests: {room.numOfGuest}</p>
            {}
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
=======
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
<<<<<<< HEAD
          <div key={room._id} className=" border-2 m-2 p-5 border-black">
            <Link to={`/room/${room._id}`}>
              <h3>{room.name}</h3>
              <p>
                Phone: <span>{room.phone}</span>
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
                      src={`http://localhost:3000/${image}`}
                      alt={`Room ${index + 1}`}
                      className="h-20 w-36 m-2"
                    />
                  ))}
                </div>
              )}
            </Link>
>>>>>>> a7bc0e27805161c3ba7983faa1f8b12ddac7ad7a
=======
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
                    src={`http://localhost:3000/${image}`}
                    alt={`Room ${index + 1}`}
                    className="h-20 w-36"
                    style={{ marginTop: "10px" }}
                  />
                ))}
              </div>
            )}
>>>>>>> parent of a7bc0e2 (review system added and getting username through jwt token)
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
