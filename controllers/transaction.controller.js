const Transaction = require("../models/transaction.model.js");
const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
const Session = require("../models/session.model.js");


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

module.exports.search = async (req,res) => {
    let transactions = await Transaction.find();
    let matchTrans = transactions.map(trans => {
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

module.exports.postCreate = async (req, res) => {
    // db.get("transactions")
    //   .push(req.body)
    //   .write();
    await Transaction.create(req.body)
    res.redirect("back");
}

module.exports.complete = async (req,res) => {
    let id = req.params.id;

    // db.get("transactions")
    //     .find({ id: id })
    //     .set("isComplete", true)
    //     .write();
    await Transaction.findByIdAndUpdate(id, { isComplete: true });
    res.redirect("back");
}

// module.exports.createCart = async (req, res) => {
//     let session = await Session.findById(req.signedCookies.sessionId);
  
//     if (session) {
//       for (let book of session.cart) {
//         for (let i = 0; i < book.quantity; i++) {
//           await Transaction.create({
//             bookId: book.bookId,
//             userId: req.signedCookies.userId
//           });
//         }
//       }
//       session.cart = [];
//       session.save();
  
//       res.redirect("/transactions");
//       return;
//     }
//   };