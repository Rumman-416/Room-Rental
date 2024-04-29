import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const UpdateForm = ({ roomId, closeForm, onUpdateSuccess, roomImages }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
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
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/${roomId}`
        );
        setRoomDetails(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append form data
      Object.keys(formData).forEach((key) => {
        formData.append(key, formData[key]);
      });
      // Append images
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }
      await axios.put(
        `http://localhost:3000/dashboard/${roomId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUpdateSuccess(true);
      onUpdateSuccess();
      console.log("Room details updated successfully!");
    } catch (error) {
      console.error("Error updating room details:", error);
      setUpdateSuccess(false);
    }
  };

  const handleCloseForm = () => {
    closeForm();
  };

  const handleSelectImage = (image) => {
    setSelectedImages([...selectedImages, image]);
  };

  const handleDeselectImage = (image) => {
    setSelectedImages(selectedImages.filter((img) => img !== image));
  };

  const handleSelectAllImages = () => {
    setSelectedImages([...roomImages]);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg">
        <button
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-700"
          onClick={handleCloseForm}
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold mb-4">Update Room Details</h1>
        {updateSuccess === true && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Data updated successfully.</span>
          </div>
        )}{" "}
        {updateSuccess === false && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Failed!</strong>
            <span className="block sm:inline"> Cannot update data!</span>
          </div>
        )}
        <div className="flex flex-wrap mb-4">
          {roomImages && roomImages.length > 0 && (
            <div className="w-full mb-2">
              <button
                onClick={handleSelectAllImages}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Select All Images
              </button>
            </div>
          )}
          {roomImages.map((image, index) => (
            <div key={index} className="w-1/4 mb-2">
              <img
                src={`http://localhost:3000/${image}`}
                alt={`Image ${index + 1}`}
                className={`w-full h-auto ${
                  selectedImages.includes(image)
                    ? "border border-blue-500"
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  selectedImages.includes(image)
                    ? handleDeselectImage(image)
                    : handleSelectImage(image)
                }
              />
            </div>
          ))}
        </div>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          onClick={handleFileInputClick}
          className="border border-gray-300 rounded-md p-1 w-full text-center mb-2 cursor-pointer"
        >
          {selectedImages.length === 0
            ? "Select Images"
            : `${selectedImages.length} image(s) selected`}
        </button>
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
