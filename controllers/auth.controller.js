const db = require("../db")
const bcrypt = require('bcrypt')
const saltRounds = 10;
const shortid = require("shortid")

let users = db.get("users").value();

module.exports.login = (req,res) => {
    res.render("auth/login")
}

module.exports.postLogin = async (req,res) => {
    let user = users.find(user => user.email === req.body.email)

    if(!user){
        res.render("auth/login", {
            errors : ["User does not exist"],
            values : req.body
        });
        return;
    }

    if(user.wrongLoginCount > 3){
        res.render("auth/login", {
            errors: ["Account has been locked"],
            values: req.body
        });
        return;
    }

    let checkPassword = await bcrypt.compare(req.body.password, user.password)
    if(!checkPassword){
        db.get("users")
          .find({ id: user.id })
          .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
          .write();
        
        res.render("auth/login", {
            errors: ["Wrong password"],
            values: req.body
        });
        return;
    }

    res.cookie("userId", user.id);
    res.redirect("/users");
}

module.exports.logout = (req,res) => {
    res.render("auth/logout")
}

module.exports.postLogout = (req,res) =>{
    res.clearCookie('userId');
    res.redirect("/auth/login")
}

module.exports.register = (req,res) => {
    res.render("auth/register")
}

module.exports.postRegister = async (req,res) =>{
    let checkEmail = await users.find(user => user.email === req.body.email)
    if(checkEmail){
        res.render("auth/register", {
            errors: ["Email has been used"],
            values : req.body
        })
        return;
    }
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    let newUserRegister = {
        id: shortid.generate(),
        email: req.body.email,
        password: hashedPassword,
        wrongLoginCount : 0,
        isAdmin : false
    }
    
    db.get("users").push(newUserRegister).write();
    res.redirect("/auth/login") 
}