const db = require('../db')
const shortid = require('shortid')
const Book = require("../models/book.model.js");

// const books = db.get("books").value();

module.exports.index = async (req,res) => res.render("books/index" ,{
    books: await Book.find()
})

module.exports.search = async (req,res) => {
    let books = await Book.find()
    let q = req.query.q;
    let filterBooks = books.filter( book => 
        book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 
    );
    res.render("books/index", {
        books: filterBooks,
        q : q
    });
}

module.exports.postCreate = async (req,res) => {
    let newBook = {
        id: shortid.generate(),
        title: req.body.title,
        description: req.body.description
    }
    
    // db.get("books").push(newBook).write();
    await Book.create(newBook)
    res.redirect("/books")    
}

module.exports.getUpdate = async (req,res) => {
    // let book = db.get("books").find({id: req.params.id}).value();
    let book = await Book.findById(req.body.id)
    res.render("books/update", {
        book: book
    }) 
}

module.exports.update = async (req,res) => {
    // db.get('books')
    //     .find({ id: req.params.id })
    //     .assign({title: req.body.title, description: req.body.description})
    //     .write();
    await Book.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        description: req.body.description
    })
    res.redirect("/books")
}

module.exports.delete = async (req,res) => {
    // db.get('books').remove({id : req.params.id}).write()
    await Book.findByIdAndRemove(id)
    res.redirect("/books")
}