const room = require("../models/roomModel");

const home = (req, res) => {
  res.send("hello");
};

const roomPost = async (req, res) => {
  try {
    if (!req.body.name || !req.body.address || !req.body.phone) {
      return res.status(400).send("Missing required fields");
    }
    const newRoom = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    };
    const roomAdd = await room.create(newRoom);

    return res.send(roomAdd);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getRoom = async (req, res) => {
  try {
    const getroom = await room.find({});
    return res.send(getroom);
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
      return res.status(200).send(roomDelete);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getRoom,
  roomPost,
  updateRoom,
  deleteRoom,
};
