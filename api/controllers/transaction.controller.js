const Transaction = require("../../models/transaction.model.js");
const Book = require("../../models/book.model.js");
const User = require("../../models/user.model.js");

module.exports.index = async (req, res) => {
  let books = await Book.find();
  let users = await User.find();
  let transactions = await Transaction.find();

  let matchTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId.toString());
    let user = users.find(user => user.id === trans.userId.toString());
    
    return { 
        bookTitle: book.title, 
        userName: user.name,
        isComplete : trans.isComplete    
    };
});
  res.json(matchTrans);
};
