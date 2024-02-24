const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
// const taskRoutes = require("./routes/eventRoutes")
const app = express();

app.use(cors())

app.use(express.json());
app.use("/api/users", userRoutes);

app.get('/',(req,res)=>{
    res.send("helloo")
})
app.get('/pm2Check', (req,res)=>{
    res.send('Hello, ')
})
app.get('/check',(req,res)=>{
    res.send("Checking")
})
// app.use("/api/event", eventRoutes);



module.exports = app;