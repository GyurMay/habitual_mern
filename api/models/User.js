const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/HabitualDB')
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((error) => {
//     console.log('Connection error:', error);
//   });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String
});
let collectionName = 'Users';
const Users = mongoose.model(collectionName, userSchema, collectionName)

// usr = { username: 'tenzin', password: require("bcryptjs").hashSync('pass', 10), name: 'Tenzin Lama' }

// Users.create(usr)
//     .then(x => console.log(x))
//     .catch(err => { return done(err) });

module.exports = Users;