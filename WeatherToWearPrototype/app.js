"use strict";
const express = require("express");
const app = express();

const multer = require("multer");

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginRouter = require("./routes/login.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const advertiserRouter = require("./routes/advertiser.route");

  
 
app.get("/", (req, res) => {
  res.json({ message: "You are at the home page!" });
});
 

// I believe this is the prefix / for example /login/whatever-in-the-controller
app.use("/other", express.static('other'));
app.use("/home", loginRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", advertiserRouter);

 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});

