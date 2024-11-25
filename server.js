const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const router = express.Router();
const apiRoutes = require("./app/routes/api")(router);

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/api", apiRoutes);

// Koneksi ke MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/your_database");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed: " + error.message);
  }
}

connectDB();

// Routing ke home.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/app/views/home.html"));
});

// Jalankan server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
