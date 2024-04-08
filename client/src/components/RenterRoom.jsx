import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateForm from "./UpdateForm";

const RenterRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
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

  return (
    <div className="p-5">
      <div>
        <form>
          <input
            type="text"
            className="h-8 rounded-md border-2 border-yellow-200"
            placeholder="search city or state..."
            onChange={handleSearchInputChange}
          />
        </form>
      </div>
      <h5 className=" text-yellow-500">All Rooms</h5>

      <div>
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className=" shadow-md shadow-slate-300 bg-slate-50 rounded-xl m-5 p-5"
          >
            <div className="flex gap-1">
              <h3 className=" font-title font-medium"> Name: </h3>
              <span> {room.name}</span>
            </div>
            <div className="flex gap-1">
              <p className=" font-title font-medium">Phone:</p>
              <span>{room.phone}</span>
            </div>
            <div className="flex gap-1">
              <p className=" font-title font-medium">Address:</p>
              <span> {room.address}</span>
            </div>
            <div className="flex gap-1">
              <p className=" font-title font-medium">City:</p>{" "}
              <span>{room.city}</span>
            </div>
            <div className="flex gap-1">
              <p className=" font-title font-medium">State</p>:
              <span>{room.state}</span>
            </div>
            <div className="flex gap-1">
              <p className=" font-title font-medium">Rent:</p>
              <span>{room.rent}</span>
            </div>
            <div className="flex gap-1">
              <p className=" font-title font-medium">Number of Guests:</p>
              <span>{room.numOfGuest}</span>
            </div>
            {/* Render images if available */}
            {room.images && (
              <div>
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/${image}`} // Assuming images are served from this endpoint
                    alt={`Room ${index + 1}`}
                    className="h-20 w-36 m-5"
                  />
                ))}
              </div>
            )}
            <div className="flex">
              <button
                className=" h-8 p-2 bg-red-500 text-white m-5"
                onClick={() => onClickDeleteRoom(room._id)}
              >
                Delete
              </button>
              <UpdateForm rooomId={room._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenterRoom;
// rummanXhackathon
