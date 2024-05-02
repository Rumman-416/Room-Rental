import React from "react";
import Navbar from "../components/Navbar";
import BookedRooms from "../components/BookedRooms";
import Footer from "../components/Footer";

const BookedRoomsPg = () => {
  return (
    <div>
      <Navbar />
      <BookedRooms />
      <Footer />
    </div>
  );
};

export default BookedRoomsPg;
