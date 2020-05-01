const express = require('express')
const app = express()
const port = 8080
const bodyParser = require("body-parser");
const shortid = require('shortid')

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const books = db.get("books").value()

app.get('/', (req, res) => res.render("index"))

app.get("/books", (req,res) => res.render("books/index" ,{
    books: books
}))

app.get("/books/search", (req,res) => {
    let q = req.query.q;
    let filterBooks = books.filter(book => book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render("books/index", {
        books: filterBooks,
        q : q
    })
})

app.post("/books/create" , (req,res) => {
    let id = shortid.generate();
    let newBook = {
        id: id,
        title: req.body.title,
        description: req.body.description
    }
    db.get("books").push(newBook).write();
    res.redirect("/books")    
})

app.get("/books/:id/update", (req,res) => {
    let book = db.get("books").find({id: req.params.id}).value();
    res.render("books/update", {
        book: book
    }) 
})

app.post("/books/:id/update", (req,res) => {
    db.get('books')
        .find({ id: req.params.id })
        .assign({title: req.body.title, description: req.body.description})
        .write();
    res.redirect("/books")
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))