import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddRooms = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [numOfGuest, setNumOfGuest] = useState("");
  const [images, setImages] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = async () => {
    try {
      if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !description ||
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
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("numOfGuest", numOfGuest);

      images.forEach((image) => {
        formData.append("images", image);
      });

      await axios.post("http://localhost:3000/dashboard", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.alert("Data added successfully");

      setName("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");
      setDescription("");
      setRent("");
      setNumOfGuest("");
      setImages([]);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center lg:mt-[4rem]">
      <div className=" ml-1 mr-1 p-4 rounded-r-md rounded-l-md  max-w-md opacity-90">
        <h3 className="text-2xl font-medium mb-4 text-center">Add Rooms</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Address"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add a description about your home"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rent"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Guests"
            className="w-full border border-gray-400 rounded-md py-2 px-4"
            value={numOfGuest}
            onChange={(e) => setNumOfGuest(e.target.value)}
          />

          <input
            type="file"
            className="my-3 flex flex-col"
            accept="image/jpeg, image/png"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <input
          type="button"
          value="Upload"
          className="h-10 w-full mt-4 bg-BT text-black rounded-md cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddRooms;
