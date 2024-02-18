const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
// const taskRoutes = require("./routes/eventRoutes")
const app = express();

app.use(cors())

app.use(express.json());
app.use("/api/users", userRoutes);
// app.use("/api/event", eventRoutes);



module.exports = app;