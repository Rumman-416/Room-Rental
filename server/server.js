const express = require("express");
const mongoose = require("mongoose");
const routeroom = require("./routes/roomRoutes");
const routeruser = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const PORT = 3000;
const URI = "mongodb://127.0.0.1:27017/roomrental";
app.use(express.json());
app.use(cors());
app.use("/dashboard", routeroom);
app.use("/api/users", routeruser);
app.use(express.static("uploads"));

mongoose
  .connect(URI)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting", err);
  });
