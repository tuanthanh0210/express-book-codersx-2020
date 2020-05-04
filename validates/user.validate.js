const db = require("../db")

let users = db.get("users").value();

module.exports.postCreate = (req,res, next) => {

    let errors = [];
    if(!req.body.name){
        errors.push("Name is require !")
    } 

    if(req.body.name.length > 20){
        errors.push("Name must be less 20 characters")
    } 

    if (!req.body.phone){
        errors.push("Phone is require !")
    }

    if(req.body.phone.length > 10){
        errors.push("Phone must be less 10 characters")
    }

    if (!req.body.email){
        errors.push("Email is require !")
    }

    let checkEmail = users.find(user => user.email === req.body.email)
    if(checkEmail){
        errors.push("User have been already exists")
    }
    
    if (!req.body.password){
        errors.push("Password is require !")
    }

    if(errors.length){
        res.render("users/index", {
            users : users,
            errors : errors,
            values : req.body
        })
        return;
    }

    next();
}

