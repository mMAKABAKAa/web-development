//jshint esversion:6
import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const saltRounds=10;

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const secret=process.env.SECRET;

const User = new mongoose.model("User", userSchema);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", function (req, res) {
    bcrypt.hash(req.body.password,saltRounds,function(err,hash){
  const newUser = new User({
    email: req.body.username,
    password: hash,
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets.ejs");
    })
    .catch((err) => {
      console.log(err);
    });
    });

});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: username });
    if (foundUser) {
        bcrypt.compare(password,foundUser.password,function(err,result){
            if(result===true){
                res.render("secrets.ejs");
            }
        })}
  } catch (err) {
    console.log(err);
    res.send("An error occurred.");
  }
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
