const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  numOfGuest: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
