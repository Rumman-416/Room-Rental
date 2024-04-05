const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  ProtectedRoute,
  verifyToken,
} = require("../controller/userController");

router.post("/register", register);
router.post("/login", loginUser);
router.get("/protected", verifyToken, ProtectedRoute);

module.exports = router;
