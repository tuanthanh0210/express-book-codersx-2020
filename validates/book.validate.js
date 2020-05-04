const db = require("../db")

let books = db.get("books").value();

module.exports.postCreate = (req,res,next) => {
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