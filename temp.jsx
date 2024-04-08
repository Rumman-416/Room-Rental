import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomBooking = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send booking request to backend
      const response = await axios.post("http://localhost:3000/book-room", {
        startDate,
        endDate,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  useEffect(() => {
    // Periodically update booking status
    const interval = setInterval(async () => {
      try {
        await axios.post("http://localhost:3000/update-booking-status");
        console.log("Booking status updated successfully.");
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Room Booking</h2>
      <form onSubmit={handleBookingSubmit}>
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={startDate || new Date()}
          />
        </div>
        <button type="submit">Book Room</button>
      </form>
    </div>
  );
};

export default RoomBooking;
