require('dotenv').config();
const express = require("express");
const app = express();
const connectDB= require("./src/Config/db");
const user= require("./src/Routes/userRoutes");
const artist= require("./src/Routes/artist2route");
const artwork= require("./src/Routes/artwork2route");
const profile= require("./src/Routes/profileRoutes");
// const art=require("./src/Routes/artworkRoute");
// const artist= require("./src/Routes/artistRoute");
const category= require("./src/Routes/categoryRoute");
const order= require("./src/Routes/orderRoutes");
const bodyParser = require('body-parser');
const cors = require('cors');

 
// app.post("/post", (req, res) => {
//     console.log("Connected to React");
//     res.redirect("/");
// });
// app.use(express.json());
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/user',user);

app.use('/api/artist', artist);

app.use('/api/artwork',artwork);

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use('/api/profile', profile);

app.use('/api/category',category);

app.use('/api/order', order);
// const port = process.env.port;
const port =process.env.port;
 
app.listen(port,
    console.log(`Server started on port ${port}`)
);