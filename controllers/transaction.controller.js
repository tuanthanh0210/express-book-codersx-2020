const db = require('../db')
const shortId = require('shortid')

let books = db.get("books").value();
let users = db.get("users").value();
let transactions = db.get("transactions").value();

module.exports.index = (req, res) => {
    let matchTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    
      
    return { 
        bookTitle: book.title, 
        userName: user.name,
        id: trans.id,
        isComplete : trans.isComplete    
    };
    });
    let page = parseInt(req.query.page) || 1;
    let perPage = 6;
    let start  = (page - 1) * perPage;
    let end = page * perPage;
   
    res.render("transactions/index", {
      transactions: matchTrans.slice(start,end),
      books,
      users,
      totalPage: Math.ceil(matchTrans.length/perPage)
    });
}

module.exports.search = (req,res) => {
    let matchTrans = db.get("transactions").value().map(trans => {
        let book = books.find(book => book.id === trans.bookId);
        let user = users.find(user => user.id === trans.userId);
        return { 
            bookTitle: book.title, 
            userName: user.name ,
            id: trans.id,
            isComplete : trans.isComplete
        };
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
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortId.generate();
    db.get("transactions")
      .push(req.body)
      .write();
    res.redirect("back");
}

module.exports.complete = (req,res) => {
    let id = req.params.id;
    console.log(req.params.id)

    db.get("transactions")
        .find({ id: id })
        .set("isComplete", true)
        .write();

    res.redirect("back");
}

