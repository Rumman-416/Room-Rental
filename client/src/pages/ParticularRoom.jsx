import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Reviews from "../components/Reviews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import { BsFillPeopleFill } from "react-icons/bs";

const ParticularRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomResponse = await axios.get(
          `http://localhost:3000/dashboard/${roomId}`
        );
        setRoom(roomResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [roomId]);

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSaveDates = () => {
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
  };

  const handleBookRoom = () => {
    // Load the Razorpay library
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Wait for the Razorpay library to load
    script.onload = () => {
      const options = {
        key: "rzp_test_Jcis91fPkftIw1",
        amount: room.rent * 100,
        currency: "INR",
        name: "Rent Kar",
        description: "Room Booking Payment",

        order_id: { roomId },
        handler: function (response) {
          alert(response.razorpay_payment_id);
          console.log("booked 123");
        },
        prefill: {
          name: "Your Name",
          email: "your@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#FF5757",
        },
      };

      // Create a new instance of Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    // Handle script loading error
    script.onerror = () => {
      console.error("Failed to load Razorpay library");
    };
  };

  return (
    <div>
      <Navbar />
      {room ? (
        <div className="container mx-auto px-5 flex flex-col gap-3">
          <div className="flex justify-center items-center w-full my-3">
            {room.images && room.images.length <= 1 ? (
              <div className="w-11/12 h-1/4 relative overflow-hidden">
                <img
                  src={`http://localhost:3000/${room.images[0]}`}
                  className="w-full bg-contain rounded-lg"
                  alt="Room"
                />
              </div>
            ) : (
              <Slider
                {...settings}
                className="w-11/12 h-1/4 relative overflow-hidden"
              >
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/${image}`}
                    alt={`Room ${index + 1}`}
                    className="bg-contain p-5 w-full"
                  />
                ))}
              </Slider>
            )}
          </div>
          <div className="flex justify-between">
            <p className="font-bold flex gap-1">
              ₹ {room.rent} <span className="font-normal">night</span>
            </p>
            <div className="flex items-center gap-1">
              <BsFillPeopleFill className="text-BT" /> {room.numOfGuest} guest
            </div>
          </div>
          <div className="flex flex-col justify-center items-stretch gap-3">
            <div className="flex justify-between">
              <label>Check In :</label>
              <DatePicker
                selected={fromDate}
                onChange={handleFromDateChange}
                dateFormat="dd/MM/yyyy"
                className="border-2 border-red-200"
              />
            </div>
            <div className="flex justify-between">
              <label>Check Out :</label>
              <DatePicker
                selected={toDate}
                onChange={handleToDateChange}
                dateFormat="dd/MM/yyyy"
                className="border-2 border-red-200"
              />
            </div>
          </div>

          <div className="font-semibold">
            Address:{" "}
            <span className="text-gray-500 font-normal text-[15px]">
              {room.address}
            </span>
          </div>
          <div className="flex flex-col gap-3 justify-between">
            <div className="font-semibold">
              City:{" "}
              <span className="text-gray-500 font-normal text-[15px]">
                {room.city}
              </span>
            </div>
            <div className="font-semibold">
              State:{" "}
              <span className="text-gray-500 font-normal text-[15px]">
                {room.state}
              </span>
            </div>
            <div className="text-gray-500 text-[15px] flex flex-col gap-3">
              <p>{room.description}</p>
              <h2 className="font-normal text-base text-BT">
                Hosted by <span className="font-semibold">{room.name}</span>
              </h2>
            </div>
          </div>

          <div className="flex justify-center items-center my-5">
            <button
              onClick={handleSaveDates}
              className="bg-BT p-3 text-white rounded-lg w-2/4 mr-3"
            >
              Save Room
            </button>
            <button
              onClick={handleBookRoom}
              className="bg-BT p-3 text-white rounded-lg w-2/4"
            >
              Book Room
            </button>
          </div>
          <Reviews />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ParticularRoom;
