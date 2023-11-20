const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    motto: String
});
let collectionName = 'Users';
const Users = mongoose.model(collectionName, userSchema, collectionName) //third one probably forces to use the given name

// let usr = { username: 'dorjee', password: require("bcryptjs").hashSync('hi', 10), name: 'Dorjee Lama' }

// Users.create(usr)
//     .then(x => console.log(x))
//     .catch(err => { return done(err) });

module.exports = Users;
