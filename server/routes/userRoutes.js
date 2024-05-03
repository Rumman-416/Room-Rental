const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  getBookedRooms,
  bookedRoom,
  deleteBookedRoom,
  getUserById,
  ProtectedRoute,
  verifyToken,
} = require("../controller/userController");

router.post("/register", register);
router.post("/login", loginUser);
router.post("/postbookedrooms", bookedRoom);
router.post("/booked-rooms", getBookedRooms);
router.delete("/booked-rooms", deleteBookedRoom);
router.get("/:id", getUserById);
router.get("/protected", verifyToken, ProtectedRoute);

module.exports = router;
