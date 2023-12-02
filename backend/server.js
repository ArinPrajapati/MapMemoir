const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./dbConnection");
const pinRouter = require("./routes/pin");
const userRouter = require("./routes/user");
const app = express();
const cors = require('cors');

app.use(express.json());
connectDB();

app.use(cors());


app.use("/map/pins", pinRouter);
app.use('/map/user', userRouter);


app.listen(8888, () => {
  console.log("listening on port 8888");
});
