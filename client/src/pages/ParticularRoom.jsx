import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Reviews from "../components/Reviews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const ParticularRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

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
        window.scrollTo(0, 0);
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

  console.log(roomId, userId);

  const updateRoom = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/postbookedrooms", {
        id: userId,
        roomId: roomId,
      });
    } catch (error) {
      console.error(error);
      window.alert("error in booking user room");
    }
    try {
      await axios.put(`http://localhost:3000/dashboard/${roomId}`, {
        booked: true,
        bookedFrom: fromDate,
        bookedTo: toDate,
      });
      navigate("/Booked-rooms");
    } catch (error) {
      console.error(error);
      window.alert("error in booking room");
    }
  };

  const handleBookRoom = () => {
    if (!fromDate || !toDate) {
      window.alert("Please select check-in and check-out dates.");
      return;
    }

    // Check if fromDate is before toDate
    if (fromDate.getTime() >= toDate.getTime()) {
      window.alert("Check-out date must be after check-in date.");
      return;
    }

    // Calculate the number of days between check-in and check-out dates
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const numberOfDays = Math.round((toDate - fromDate) / millisecondsPerDay);

    // Calculate the total amount based on the number of days and room rent
    const totalAmount = room.rent * numberOfDays;

    // Load the Razorpay library
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Wait for the Razorpay library to load
    script.onload = () => {
      const options = {
        key: "rzp_test_Jcis91fPkftIw1",
        amount: totalAmount * 100,
        currency: "INR",
        name: "Rent Kar",
        description: "Room Booking Payment",

        order_id: { roomId },
        handler: function (response) {
          alert(response.razorpay_payment_id);
          console.log("booked 123");
          updateRoom();
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

  const handleViewFullImage = (image) => {
    setFullImage(image); // Set full image state to the clicked image
  };

  const handleCloseFullImage = () => {
    setFullImage(null); // Revert full image state to null
  };

  const today = new Date();

  // Set the time to 00:00:00 (start of the day)
  today.setHours(0, 0, 0, 0);

  // Set minDate to today's date
  const minDate = today;

  return (
    <div>
      <Navbar />
      {room ? (
        <div className="container mx-auto px-5 flex flex-col items-center gap-3 md:px-[8rem] lg:px-[10rem] xl:px-[24rem] ">
          {fullImage && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
              <img
                src={`http://localhost:3000/${fullImage}`}
                alt="Full Image"
                className="max-w-full max-h-full"
              />
              <IoClose
                onClick={handleCloseFullImage}
                className="absolute top-5 right-5  text-white text-3xl"
              />
            </div>
          )}
          <div className=" xl:w-[50vw]">
            <div className="flex justify-center items-center w-full my-3">
              {room.images && room.images.length <= 1 ? (
                <div className="w-11/12 h-auto relative overflow-hidden flex justify-center items-center sm:w-9/12 lg:w-7/12 ">
                  <img
                    src={`http://localhost:3000/${room.images[0]}`}
                    className="w-full bg-contain rounded-lg"
                    alt="Room"
                    onClick={() => handleViewFullImage(room.images[0])}
                  />
                </div>
              ) : (
                <Slider
                  {...settings}
                  className="w-auto h-[9rem] mp:h-[11rem] lp:h-[13rem] sm:h-[15rem]  
                md:h-[18rem] lg:h-[20rem]   xl:h-[18rem] xl:w-8/12 relative overflow-hidden flex justify-center items-start"
                >
                  {room.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/${image}`}
                      alt={`Room ${index + 1}`}
                      className="bg-contain p-5 w-full bg-center"
                      onClick={() => handleViewFullImage(image)}
                    />
                  ))}
                </Slider>
              )}
            </div>
            <div className=" flex flex-col gap-3">
              <div className="flex justify-between xl:justify-start xl:gap-[10rem]">
                <p className="font-bold flex gap-1">
                  ₹ {room.rent} <span className="font-normal">night</span>
                </p>
                <div className="flex items-center gap-1">
                  <BsFillPeopleFill className="text-BT" /> {room.numOfGuest}{" "}
                  guest
                </div>
              </div>
              <div className="flex flex-col justify-center items-stretch gap-3">
                <div className="flex justify-between xl:justify-start xl:gap-10">
                  <label>Check In :</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDateChange}
                    minDate={minDate}
                    dateFormat="dd/MM/yyyy"
                    className="border-2 border-red-200"
                  />
                </div>
                <div className="flex justify-between xl:justify-start xl:gap-7">
                  <label>Check Out :</label>
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDateChange}
                    minDate={fromDate}
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
              {room.booked ? (
                <div className=" flex justify-center items-center p-2 gap-2 bg-BT rounded-lg text-white">
                  <RiEmotionUnhappyLine className=" text-2xl" />
                  <h1>we're sorry this room is currently booked</h1>
                </div>
              ) : (
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
              )}
            </div>
            <Reviews />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <Footer />
    </div>
  );
};

export default ParticularRoom;
