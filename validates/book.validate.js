const db = require("../db")
const Book = require("../models/book.model")

// let books = db.get("books").value();

module.exports.postCreate = async (req,res,next) => {
    let books = await Book.find();
    let errors = [];
    if(!req.body.title){
        errors.push("Title is require")
    }
    if(!req.body.description){
        errors.push("Description is require")
    }
    if(errors.length){
        res.render("books/index", {
            books: books,
            errors : errors,
            values : req.body
        })
        return;
    }

    next();
}