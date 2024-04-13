const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const colors = require("colors");
const { connectDB } = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use("/api/delivery", require("./routes/addDeliveryPersonRoutes"))
app.use("/api/mainUser", require("./routes/mainUserRoutes"))
app.use("/api/deliveryPerson", require("./routes/deliveryPersonRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))