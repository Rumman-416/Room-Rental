const express = require("express");
const {
  roomPost,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controller/controller");

const router = express.Router();

router.get("/", getRoom);
router.post("/", roomPost);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
