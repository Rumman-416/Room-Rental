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
  console.log(userId);
  // Function to convert image to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        console.log(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map(toBase64));
    setImages(base64Images);
  };

  const handleSubmit = async () => {
    try {
      if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !rent ||
        !numOfGuest ||
        !images
      ) {
        return window.alert("Please fill all the information");
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
      formData.append("userId", userId); // Include user ID in the form data
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
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
        {/* <LocationSelector /> */}
        <div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div>
          <img src={images} alt="" className=" h-24 w-52" />
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

//DFA8E4
//590d80
export default AddRooms;
