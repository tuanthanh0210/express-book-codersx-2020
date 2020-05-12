const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: String,
    isComplete: Boolean,
})

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;