import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddRooms = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [rent, setRent] = useState("");
  const [numOfGuest, setNumOfGuest] = useState("");
  const [images, setImages] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]); // Concatenate new files with existing images
  };

  const handleSubmit = async () => {
    try {
      console.log("Images:", images);
      if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !rent ||
        !numOfGuest ||
        !images.length
      ) {
        return window.alert(
          "Please fill all the information and select at least one image."
        );
      }
      if (
        parseInt(phone) < 0 ||
        parseInt(rent) < 0 ||
        parseInt(numOfGuest) < 0
      ) {
        return window.alert(
          "Phone, Rent, and Number of Guests cannot be negative."
        );
      }
      if (phone.length !== 10) {
        return window.alert(
          "Invalid phone number. Please enter a 10-digit phone number."
        );
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("rent", rent);
      formData.append("numOfGuest", numOfGuest);

      console.log("Before map, images:", images);

      // Append images to formData using map
      const imageFiles = images.map((image) => {
        formData.append("images", image);
        return image;
      });

      await axios.post("http://localhost:3000/dashboard", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.alert("Data added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-5">
          <h5>Name</h5>
          <input
            type="text"
            className="border-2"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <h5>Phone</h5>
          <input
            type="number"
            className="border-2"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <h5>Room Address</h5>
          <input
            type="text"
            className="border-2"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <h5>City</h5>
          <input
            type="text"
            className="border-2"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <h5>State</h5>
          <input
            type="text"
            className="border-2"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <h5>Rent</h5>
          <input
            type="number"
            className="border-2"
            onChange={(e) => setRent(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <h5>Number of Guests</h5>
          <input
            type="number"
            className="border-2"
            onChange={(e) => setNumOfGuest(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div>
          <input
            type="button"
            value="Upload"
            className="h-8 w-20 bg-[#DFA8E4] cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default AddRooms;
