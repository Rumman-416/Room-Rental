const room = require("../models/roomModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded file
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

const roomPost = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.address ||
      !req.body.phone ||
      !req.body.city ||
      !req.body.state ||
      !req.body.rent ||
      !req.body.numOfGuest ||
      !req.files ||
      req.files.length === 0 // Check if files are uploaded
    ) {
      return res.status(400).send("Missing required fields or images");
    }

    // Retrieve file paths of uploaded images
    const images = req.files.map((file) => file.path.replace("uploads/", ""));

    // const images = req.files.map((file) => file.path);

    const newRoom = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      rent: req.body.rent,
      numOfGuest: req.body.numOfGuest,
      images: images,
      user: req.body.userId,
    };

    const roomAdd = await room.create(newRoom);
    console.log(roomAdd);
    return res.send(roomAdd);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error", error);
  }
};

const getAllRoom = async (req, res) => {
  try {
    const getroom = await room.find({});
    return res.send(getroom);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getRenterRoom = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.body.userId) {
      return res.status(466).send("Unauthorized");
    }

    // Retrieve rooms belonging to the authenticated user
    const userRooms = await room.find({ user: req.body.userId });
    return res.send(userRooms);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getParticularRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const getroom = await room.findById(id);
    if (!getroom) {
      return res.status(404).send("data not found");
    } else {
      return res.status(200).send(getroom);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const roomUpdate = await room.findByIdAndUpdate(id, req.body);
    if (!roomUpdate) {
      return res.status(404).send("data not found");
    } else {
      return res.status(200).send(roomUpdate);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const roomDelete = await room.findByIdAndDelete(id);
    if (!roomDelete) {
      return res.status(404).send("data not found");
    } else {
      // Remove associated images from the uploads folder
      roomDelete.images.forEach((imageName) => {
        const imagePath = path.join(__dirname, "..", "uploads", imageName);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          } else {
            console.log("Image deleted:", imagePath);
          }
        });
      });

      return res.status(200).send(roomDelete);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const uploadMiddleware = upload.array("images");

module.exports = {
  getAllRoom,
  getRenterRoom,
  getParticularRoom,
  roomPost,
  updateRoom,
  deleteRoom,
  uploadMiddleware,
};
