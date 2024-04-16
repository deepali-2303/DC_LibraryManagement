const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
// const port = process.env.PORT || 5000;
// const port1 = process.env.PORT1 || 5000;
const port2 = process.env.PORT2 || 5000;
const colors = require("colors");
const { connectDB } = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.port = port2; // Store port number in req object
  next();
});

// app.use("/api/delivery", require("./routes/addDeliveryPersonRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/student", require("./routes/studentRoutes"))

app.use(errorHandler)

app.listen(port2, () => console.log(`Server started on port ${port2}`))