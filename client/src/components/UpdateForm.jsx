// UpdateForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const UpdateForm = ({ roomId, closeForm, onUpdateSuccess }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null); // State variable for update success message

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    rent: "",
    numOfGuest: "",
    description: ""
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dashboard/${roomId}`);
        setRoomDetails(response.data);
        setFormData(response.data); // Set form data with fetched room details
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform update operation with formData
      await axios.put(`http://localhost:3000/dashboard/${roomId}`, formData);
      setUpdateSuccess(true); // Set update success message
      onUpdateSuccess();
      console.log("Room details updated successfully!");
     
    } catch (error) {
      console.error("Error updating room details:", error);
      setUpdateSuccess(false);
    }
  };

  const handleCloseForm = () => {
    closeForm(); // Close the form
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg">
      
      <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-700" onClick={handleCloseForm}>
          <AiOutlineClose className="text-2xl"/>
        </button>
        <h1 className="text-xl font-bold mb-4">Update Room Details</h1>
        {updateSuccess ===true && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Data updated successfully.</span>
          </div>
        ) } {updateSuccess ===false && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Failed!</strong>
            <span className="block sm:inline"> Cannot update data!</span>
            </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Rent:
            <input
              type="text"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Number of Guests:
            <input
              type="text"
              name="numOfGuest"
              value={formData.numOfGuest}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1 w-full"
            ></textarea>
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Update
          </button>
          <button type="button" onClick={closeForm} className="ml-2 text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
