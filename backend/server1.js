const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port1 = process.env.PORT1 || 5000;
const colors = require("colors");
const { connectDB } = require("./config/db");
const Redis = require('ioredis');
const cors = require('cors');



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.port = port1; // Store port number in req object
  next();
});

// Update connection settings to point to Memurai
const redisClient = new Redis({
    port: 6379, // Default Memurai port
    host: '127.0.0.1', // Default Memurai host
});

// app.use("/api/delivery", require("./routes/addDeliveryPersonRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/student", require("./routes/studentRoutes"))

app.use(errorHandler)

app.listen(port1, () => console.log(`Server started on port ${port1}`))