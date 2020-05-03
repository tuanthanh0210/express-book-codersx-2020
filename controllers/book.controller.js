const db = require('../db')
const shortid = require('shortid')

const books = db.get("books").value();

module.exports.index = (req,res) => res.render("books/index" ,{
    books: books
})

module.exports.search = (req,res) => {
    let q = req.query.q;
    let filterBooks = books.filter( book => 
        book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 
    );
    res.render("books/index", {
        books: filterBooks,
        q : q
    });
}

module.exports.postCreate = (req,res) => {
    let newBook = {
        id: shortid.generate(),
        title: req.body.title,
        description: req.body.description
    }
    
    db.get("books").push(newBook).write();
    res.redirect("/books")    
}

module.exports.getUpdate = (req,res) => {
    let book = db.get("books").find({id: req.params.id}).value();
    res.render("books/update", {
        book: book
    }) 
}

module.exports.update = (req,res) => {
    db.get('books')
        .find({ id: req.params.id })
        .assign({title: req.body.title, description: req.body.description})
        .write();
    res.redirect("/books")
}

module.exports.delete = (req,res) => {
    db.get('books').remove({id : req.params.id}).write()
    res.redirect("/books")
}