const express = require("express");
const {
  roomPost,
  getRoom,
  updateRoom,
  deleteRoom,
  uploadMiddleware, // Import the uploadMiddleware from the controller
} = require("../controller/controller");

const router = express.Router();

router.get("/", getRoom);
router.post("/", uploadMiddleware, roomPost); // Use uploadMiddleware before roomPost
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
