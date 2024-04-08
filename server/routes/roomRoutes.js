const express = require("express");
const {
  roomPost,
  getAllRoom,
  getRenterRoom,
  getParticularRoom,
  postReview,
  updateRoom,
  deleteRoom,
  // updateBookingStatus,
  uploadMiddleware, // Import the uploadMiddleware from the controller
} = require("../controller/roomController");

const router = express.Router();

router.get("/", getAllRoom); // GET endpoint to fetch all rooms
router.get("/:id", getParticularRoom); // GET endpoint to fetch
router.post("/", uploadMiddleware, roomPost); // POST endpoint to add a new room, using uploadMiddleware to handle images
// router.post("/update-booking-status");
router.post("/renter", getRenterRoom); // GET endpoint to fetch rooms belonging to a specific renter
router.post("/:id", postReview); // GET endpoint to fetch
router.put("/:id", updateRoom); // PUT endpoint to update a room by ID
router.delete("/:id", deleteRoom); // DELETE endpoint to delete a room by ID

module.exports = router;
