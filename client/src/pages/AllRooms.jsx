import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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
    <div className="m-3">
      <div>
        <form>
          <div className="border border-black flex h-8 rounded-md items-center">
            <input
              type="text"
              className="h-full w-full"
              placeholder="search city or state..."
              onChange={handleSearchInputChange}
            />
            <FaSearch className="text-2xl text-gray-300" />
          </div>
        </form>
      </div>
      <h5>All Rooms</h5>

      <div>
        {filteredRooms.map((room) => (
          <div key={room._id} className="  p-3.5 shadow-2xl rounded-3xl m-1">
            <Link to={`/room/${room._id}`}>
              {/* Render images if available */}
              {room.images && (
                <div className=" bg-slate-800 rounded-2xl">
                  {room.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/${image}`}
                      alt={`Room ${index + 1}`}
                      className="h-40 w-full rounded-2xl"
                    />
                  ))}
                </div>
              )}
              <div className=" pl-2 pr-2">
                <div className="flex justify-between">
                  <h3 className="font-bold text-xl">{room.name}</h3>
                  <p>rating</p>
                </div>
                <p>City: {room.city}</p>
                <p>State: {room.state}</p>
                <div className="flex flex-row">
                  <p>Rent: ₹ </p> <p className="font-bold">{room.rent}</p>
                </div>
                <p>Number of Guests: {room.numOfGuest}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
