import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const UpdateForm = ({ id, closeForm, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    rent: "",
    numOfGuest: "",
    description: "",
  });

  const [updateSuccess, setUpdateSuccess] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/dashboard/${id}`, formData);
      setUpdateSuccess(true); // Set update success
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating room details:", error);
      setUpdateSuccess(false); // Set update failure
    }
  };
  
  

  const handleCloseForm = () => {
    closeForm();
  };

  useEffect(() => {
    if (updateSuccess !== null) {
      const timer = setTimeout(() => {
        setUpdateSuccess(null);
        closeForm();
      }, 2000); // Close the form after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, closeForm]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full sm:w-auto">
        <button
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-700"
          onClick={handleCloseForm}
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold mb-4">Update Room Details</h1>

        {updateSuccess === true && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Data updated successfully.</span>
          </div>
        )}
        {updateSuccess === false && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Failed!</strong>
            <span className="block sm:inline"> Cannot update data!</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">No. of Guest:</label>
              <input
                type="text"
                name="numOfGuest"
                value={formData.numOfGuest}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Rent:</label>
              <input
                type="text"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label className="block mb-2">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 w-full h-25"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateForm.propTypes = {
  id: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default UpdateForm;
