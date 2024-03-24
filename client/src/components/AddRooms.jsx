import React, { useState } from "react";
import axios from "axios";

const AddRooms = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [rent, setRent] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("rent", rent);
      images.forEach((image) => {
        formData.append("images", image);
      });

      await axios.post("your-backend-url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");
      setRent("");
      setImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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
      {/* <LocationSelector /> */}
      <div>
        <input type="file" multiple onChange={handleImageChange} />
      </div>
      <div>
        <input
          type="button"
          value="Upload"
          className=" h-8 w-20 bg-red-300 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddRooms;
