const Book = require("../../models/book.model.js");

module.exports.index = async (req, res) => {
  let books = await Book.find();
  let returnBook = books.map(book => {
    return {
      title: book.title,
      description: book.description
    }
  })
  res.json(returnBook);
};

module.exports.search = async (req,res) => {
  let books = await Book.find()
  let q = req.query.q;
  let filterBooks = books.filter( book => 
      book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 
  );
  res.json(filterBooks)
}

module.exports.create = async (req, res) => {
  let newBook = await Book.create(req.body);

  res.json(newBook);
};

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  let book = await Book.findByIdAndRemove(id);

  res.json(book);
};
