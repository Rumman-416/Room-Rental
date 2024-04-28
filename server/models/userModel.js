const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  landlord: { type: Boolean, default: false },
  bookedrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
