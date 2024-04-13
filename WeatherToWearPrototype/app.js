"use strict";
const express = require("express");
const app = express();
const multer = require("multer");
const session = require("express-session");
const path = require("path");

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views', 'partials'));

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));


const loginRouter = require("./routes/login.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const advertiserRouter = require("./routes/advertiser.route");

 

// I believe this is the prefix / for example /login/whatever-in-the-controller
app.use("/other", express.static('other'));
app.use("/", loginRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", advertiserRouter);

 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});

