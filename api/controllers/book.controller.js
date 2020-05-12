const Book = require("../../models/book.model.js");

module.exports.index = async (req, res) => {
  let books = await Book.find();
  let returnBook = books.map(book => {
    return {
      id: book.id,
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

module.exports.update = async (req,res) => {
  let id = req.params.id;
  let book = await Book.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
  })
  let updateBook = {
    title: req.body.title,
    description: req.body.description,
  }
  res.json(updateBook)
}

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  let book = await Book.findByIdAndRemove(id);

  res.json(book);
};
