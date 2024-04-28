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
  description: {
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
  bookedFrom: {
    type: Date, // Change the type to Date to store date values
  },
  bookedTo: {
    type: Date, // Change the type to Date to store date values
  },
  reviews: [
    {
      reviewername: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
