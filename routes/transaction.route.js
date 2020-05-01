const express = require('express')
const router = express.Router()
const db = require('../db')
const shortId = require('shortid')

// Transactions
  let books = db.get("books").value();
  let users = db.get("users").value();
  let transactions = db.get("transactions").value();

router.get("/", (req, res) => {
  let matchTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    
    return { bookTitle: book.title, userName: user.name };
  });
 
  res.render("transactions/index", {
    transactions: matchTrans,
    books,
    users
  });
});

router.get("/search", (req,res) => {
    let matchTrans = db.get("transactions").value().map(trans => {
        let book = books.find(book => book.id === trans.bookId);
        let user = users.find(user => user.id === trans.userId);
        return { bookTitle: book.title, userName: user.name };
    });

    let q = req.query.q;
    let filterMatchTrans = matchTrans.filter(matchTran => 
        (matchTran.userName + matchTran.bookTitle).toLowerCase().indexOf(q.toLowerCase()) !== -1
    )

    res.render("transactions/index", {
        transactions: filterMatchTrans,
        books,
        users,
        q: q
      });

})

router.post("/", (req, res) => {
  req.body.id = shortId.generate();

  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
});

module.exports = router;