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

    if(errors.length){
        res.render("users/index", {
            users : users,
            errors : errors
        })
        return;
    }

    next();
}

