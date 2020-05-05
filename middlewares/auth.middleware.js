const db = require('../db')
const User = require("../models/user.model");

module.exports.requireAuth = async (req,res,next) => {
  if(!req.signedCookies.userId){
    res.redirect("/auth/login");
    return;
  }
  
  // let user = db.get("users").find({id: req.signedCookies.userId}).value();
  let user = await User.findById(req.signedCookies.userId);
  if(!user){
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;
  next();
}