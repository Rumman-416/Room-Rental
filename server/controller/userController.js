const User = require("../models/userModel");
const Room = require("../models/roomModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password, landlord } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, email, password: hashedPassword, landlord });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "secret"
    );

    res.json({ userId: user._id, username: user.username, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getBookedRooms = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the user by id and populate the bookedrooms field with room details
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const bookedRoom = async (req, res) => {
  try {
    const { id, roomId } = req.body; // Destructure id and roomId from the request body

    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the room by roomId
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is already booked
    if (room.booked) {
      return res.status(400).json({ message: "Room is already booked" });
    }

    // Push the booked room's ObjectId to the user's bookedrooms array
    user.bookedrooms.push(roomId);

    // If the room was successfully booked, update the booked field in the room model
    room.booked = true;
    await room.save();

    // Save the updated user
    await user.save();

    // Send success response
    res.status(200).json({ message: "Room successfully booked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteBookedRoom = async (req, res) => {
  const { roomId } = req.body;

  try {
    // Find the user by roomId
    const user = await User.findOneAndUpdate(
      { bookedrooms: roomId },
      { $pull: { bookedrooms: roomId } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "Room not found in user's booked rooms" });
    }

    res.status(200).json({ message: "Booked room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const ProtectedRoute = (req, res) => {
  res.json({ message: "Protected Route Accessed" });
};

// Middleware to verify JWT
async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    req.userName = decoded.username;
    next();
  });
}

module.exports = {
  register,
  loginUser,
  getBookedRooms,
  bookedRoom,
  deleteBookedRoom,
  ProtectedRoute,
  verifyToken,
};
