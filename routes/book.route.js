const express = require('express')
const router = express.Router()
const db = require('../db')
const shortid = require('shortid')

const books = db.get("books").value();

router.get("/", (req,res) => res.render("books/index" ,{
  books: books
}))

router.get("/search", (req,res) => {
  let q = req.query.q;
  let filterBooks = books.filter(book => book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  res.render("books/index", {
      books: filterBooks,
      q : q
  })
})

router.post("/create" , (req,res) => {
  let id = shortid.generate();
  let newBook = {
      id: id,
      title: req.body.title,
      description: req.body.description
  }
  db.get("books").push(newBook).write();
  res.redirect("/books")    
})

router.get("/:id/update", (req,res) => {
  let book = db.get("books").find({id: req.params.id}).value();
  res.render("books/update", {
      book: book
  }) 
})

router.post("/:id/update", (req,res) => {
  db.get('books')
      .find({ id: req.params.id })
      .assign({title: req.body.title, description: req.body.description})
      .write();
  res.redirect("/books")
})

router.get("/:id/delete", (req,res) => {
  db.get('books').remove({id : req.params.id}).write()
  res.redirect("/books")
})

module.exports = router;