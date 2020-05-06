const Transaction = require("../../models/transaction.model.js");
const Book = require("../../models/book.model.js");
const User = require("../../models/user.model.js");

module.exports.index = async (req, res) => {
  res.json(await Transaction.find());
};
