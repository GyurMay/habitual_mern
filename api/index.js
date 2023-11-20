const express = require("express");
const morgan = require("morgan");
const path = require("path");
const passport = require('./middlewares/authentication');
const expressSession = require('express-session');
// const db = require("./models");
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
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
const Users = require("./models/User");

app.use(cors({
    origin: "http://localhost:3000",
    method: ['POST, GET'],
    credentials: true
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
  // app.get("*", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../client/build", "index.html")); //temp
  // });
}
// app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  // app.get("*", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../client/build", "index.html")); //temp
  // });

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
    let uId = req.session.passport.user;
    console.log(uId)
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

app.post("/api/habit/create", 
  passport.isAuthenticated(),
  (req, res) => {
    //sample req.body looks like this => {content: {habitId: 100, makeHabit:"",...}, user: auth.user }
    // console.log(req.user, "req.user")
     let uId = req.body.user.id;
     console.log("userid", uId)
     let content = req.body.content;
     Habits.findOne({userId: uId})
            .then(r => {
              Habits.updateOne({userId: uId}, {$push: {habits: content}})
                .then(r => res.status(200).json(r))
                .catch(e => res.status(500).json({error: 'couldnt update habit list'}))
            })
            .catch(e => res.status(500).json({error: e}))
      console.log("reached")
});

app.get("/api/habit/:id",
  passport.isAuthenticated(),
  (req, res) => {
  Habits.findOne({habits: {$elemMatch: { habitId: parseInt(req.params.id) }}})
    .then(r => {
      res.status(200).json(r)
    }).catch(error => {
      res.status(500).json({ error: error });
    });
})

app.post("/api/habit/:id/update", 
passport.isAuthenticated(),
(req, res) => {
  Habits.update({habits: {$elemMatch: { habitId: parseInt(req.params.id) }}}, {$set: {"habits.$": JSON.parse(req.body.newhabit)}} )
    .then(doc => {
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
    
    /* if(req.user === 'dorjee' && req.password === 'hi'){
    //   res.json(req.user);
    } */ 
    res.json(req.user)
  });
  
  app.post('/api/register', 
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    
    /* if(req.user === 'dorjee' && req.password === 'hi'){
    //   res.json(req.user);
    } */ 
    // console.log(req.body.username, req.body.password)
    const password = bcrypt.hashSync(req.body.password, 10);
    Users.create({
      username: req.body.username,
      password,
      name: req.body.name
    })
    .then(r => {
      // res.status(500).end(); {
      res.status(200).json({name: r._doc.name, username: r._doc.username});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })  
  });

app.get('/api/login',
  (req, res) => {
    if(req.user){
       res.json(req.user)
    }else{
      res.sendStatus(401);
    }
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