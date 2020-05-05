// const User = require("../models/user.model");
// const Session = require("../models/session.model");

// module.exports = async (req, res, next) => {
//   if (req.signedCookies.userId) {
//     let user = await User.findById(req.signedCookies.userId);
//     if (user) {
//       res.locals.user = user;
//     }
//   }

//   if (!req.signedCookies.sessionId) {
//     let newSession = await Session.create({});

//     res.cookie("sessionId", newSession.id, {
//       signed: true
//     });
//   }

//   let session = await Session.findById(req.signedCookies.sessionId);

//   let count = 0;

//   if (session) {
//     for (let book of session.cart) {
//       count += book.quantity;
//     }
//   }

//   res.locals.count = count;

//   next();
// };
