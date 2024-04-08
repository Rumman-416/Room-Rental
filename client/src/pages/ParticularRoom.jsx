import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Reviews from "../components/Reviews";
import { useSelector } from "react-redux";

const ParticularRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/${roomId}`
        );
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSaveDates = () => {
    // You can perform any actions here to save both from and to dates
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
  };

  return (
    <div>
      {room ? (
        <div>
          <h2>{room.name}</h2>
          <p>Phone: {room.phone}</p>
          <p>Address: {room.address}</p>
          <p>City: {room.city}</p>
          <p>State: {room.state}</p>
          <p>Rent: {room.rent}</p>
          <p>Number of Guests: {room.numOfGuest}</p>
          <div>
            <label>From Date:</label>
            <DatePicker
              selected={fromDate}
              onChange={handleFromDateChange}
              dateFormat="dd/MM/yyyy"
              className=" border-2 border-yellow-100"
            />
          </div>
          <div>
            <label>To Date:</label>
            <DatePicker
              selected={toDate}
              onChange={handleToDateChange}
              dateFormat="dd/MM/yyyy"
              className=" border-2 border-yellow-100"
            />
          </div>
          <button onClick={handleSaveDates}>Save Dates</button>
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
          <div>
            <Reviews />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ParticularRoom;
