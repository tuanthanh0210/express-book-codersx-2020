const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    wrongLoginCount : Number,
    isAdmin : Boolean,
    avatar: String
})

const User = mongoose.model("users", userSchema)

module.exports = User;