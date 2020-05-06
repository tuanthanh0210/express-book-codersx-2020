const bcrypt = require("bcrypt");

const User = require("../../models/user.model.js");

const saltRounds = 10;

module.exports.index = async (req, res) => {
  let users = await User.find();
  let usersNonPassword = users.map(user => {
      return {
          email: user.email,
          name: user.name,
          phone: user.phone,
      }
  })
  res.json(usersNonPassword);
};

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  let user = await User.findByIdAndRemove(id);

  res.json(user);
};
