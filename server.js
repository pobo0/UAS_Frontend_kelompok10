const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const router = express.Router();
const apiRoutes = require("./app/routes/api")(router);
const cors = require('cors');

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/api", apiRoutes);
app.use(cors());

// Koneksi ke MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tutorial1");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed: " + error.message);
  }
}

connectDB();

app.use(cors({
  origin: 'http://127.0.0.1:5500' // Domain frontend Anda
}));
app.options('*', cors()); // Tangani preflight untuk semua endpoint


app.post('/api/users', (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('Request Data:', { username, email, password }); // Debug input

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error in /register route:', err); // Log error stack
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});


// Routing ke home.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/views/home.html"));
});

// Jalankan server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});