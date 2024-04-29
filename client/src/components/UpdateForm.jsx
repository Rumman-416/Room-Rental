// UpdateForm.js
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const UpdateForm = ({ roomId, closeForm, onUpdateSuccess, images: initialImages }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null); // State variable for update success message
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectAllImages, setSelectAllImages] = useState(false);
  const [newImages, setNewImages] = useState(initialImages); // State variable for new images

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
  // Handle image selection
  const handleImageClick = (index) => {
    const selectedIndex = selectedImages.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedImages([...selectedImages, index]);
    } else {
      const updatedSelection = selectedImages.filter((i) => i !== index);
      setSelectedImages(updatedSelection);
    }
  };

  // Handle "Select All" functionality
  const handleSelectAllImages = () => {
    if (!selectAllImages) {
      setSelectedImages([...Array(newImages.length).keys()]);
    } else {
      setSelectedImages([]);
    }
    setSelectAllImages(!selectAllImages);
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const urls = Array.from(fileList).map(file => URL.createObjectURL(file));
    
    // Replace the selected images with the files chosen from the gallery
    const updatedImages = [...newImages];
    selectedImages.forEach((index, i) => {
      updatedImages[index] = urls[i];
    });
    
    setNewImages(updatedImages);
  };

  const selectedImagesUrls = selectedImages.map(index => newImages[index]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new FormData object to include both form data and images
      const formDataWithImages = new FormData();
      // Append form data fields to formDataWithImages
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImages.append(key, value);
      });
      // Append updated images to formDataWithImages
      newImages.forEach((image, index) => {
        formDataWithImages.append(`image_${index}`, image);
      });
      // Perform update operation with formDataWithImages
      await axios.put(`http://localhost:3000/dashboard/${roomId}`, formDataWithImages, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for formData
        }
      });
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
    <div className=" top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full sm:w-auto">
        <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-700" onClick={handleCloseForm}>
          <AiOutlineClose className="text-2xl"/>
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
          <div className="mt-4">
            <input
              type="checkbox"
              checked={selectAllImages}
              onChange={handleSelectAllImages}
              className="mr-2"
            />
            <label className="cursor-pointer" onClick={handleSelectAllImages}>Select All</label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {newImages && newImages.map((image, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-md cursor-pointer ${selectedImages.includes(index) ? 'ring ring-blue-500 ring-offset-2' : ''}`}
                onClick={() => handleImageClick(index)}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.includes(index)}
                  onChange={() => handleImageClick(index)}
                  className="absolute top-2 left-2 z-10 hidden"
                />
                <img
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt={`Room Image ${index + 1}`}
                  className="object-cover w-full h-40"
                />
              </div>
            ))}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
            className="mt-4"
          />
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
          
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
              Update
            </button>
            <button type="button" onClick={closeForm} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
UpdateForm.propTypes = {
  roomId: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired // Validate 'images' prop as an array of strings
};
export default UpdateForm;
