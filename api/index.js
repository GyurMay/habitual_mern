const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bcrypt = require("bcryptjs")
const passport = require('./middlewares/authentication');
const expressSession = require('express-session');
// const db = require("./models");
const app = express();
const router = express.Router();
const expressSanitizer = require('express-sanitizer')
const Habits = require("./models/Habits");

const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/HabitualDB')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });

require('dotenv').config();

//generic template start
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:3000",
    method: ['POST, GET']
}));


const PORT = process.env.PORT;

//has to be used after the body-parser inorder to sanitize
app.use(expressSanitizer());

// this lets us parse 'application/json' content in http requests
app.use(express.json());

// setup passport and session cookies
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}
// app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });

  // Habits.create({userId: 2,habits: [{ habitId: 102, makeHabit: '100m x 10 dash', breakHabit: 'No high calorie intake', progress: 50, daysRemaining: 5, streak: 0, days: 6}]});
  
// start up the server
if (PORT) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
} else {
  console.log("===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====");
}


app.get("/home", 
  passport.isAuthenticated(),
  (req, res) => {
    // console.log(Habits)  
    // console.log(req.session, userObj)
    let uId = req.session.passport.user;
    Habits.findOne({userId: uId})
    .then(docs => {
      res.status(200).json({
        message: 'Documents fetched successfully!',
        habits: docs
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

app.get("/api/habit/:id", (req, res) => {
  Habits.findOne({habits: {$elemMatch: { habitId: parseInt(req.params.id) }}})
    .then(r => {
      res.status(200).json(r)
    }).catch(error => {
      res.status(500).json({ error: error });
    });
})

app.post("/api/habit/:id/update", (req, res) => {
  Habits.update({habits: {$elemMatch: { habitId: parseInt(req.params.id) }}}, {$set: {"habits.$": JSON.parse(req.body.newhabit)}} )
    .then(dpc => {
      res.status(200).json(doc);
    }).catch(error => {
      res.status(500).json({ error: error });
    });
});

app.post('/api/login',
  passport.authenticate('local'), 
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  });

app.post('/api/logout', 
passport.isAuthenticated(),
function(req, res, next){
  req.logout((err) => {
    if (err) { return next(err); }
    // res.redirect('/');
  });
  res.status(200).json({ message: 'Logout successful' });
});