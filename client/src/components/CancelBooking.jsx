import axios from "axios";
import React from "react";

const CancelBooking = ({ roomId }) => {
  const cancelBooking = async () => {
    try {
      axios.delete("http://localhost:3000/api/users/booked-rooms", {
        data: { roomId },
      });
      await axios.put(`http://localhost:3000/dashboard/${roomId}`, {
        booked: false,
        bookedFrom: null,
        bookedTo: null,
      });
      console.log(roomId);
      window.alert("Cancelled");
    } catch (error) {
      console.error(error);
      window.alert("error oxxurred while canceling");
    }
  };
  return (
    <div>
      <input
        type="button"
        value="Cancel Booking"
        className=" bg-red-600 text-white p-2 rounded-lg"
        onClick={cancelBooking}
      />
    </div>
  );
};

export default CancelBooking;
