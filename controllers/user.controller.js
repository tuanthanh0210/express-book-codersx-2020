const db = require('../db')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const users = db.get("users").value();

module.exports.index =  (req,res) => res.render("users/index" ,{
    users: users,
})

module.exports.search = (req,res) => {
    let q = req.query.q;
    let filterUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render("users/index", {
        users: filterUsers,
        q : q
    })
}

module.exports.postCreate = async (req,res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    let newUser = {
        id: shortid.generate(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        wrongLoginCount : 0,
        isAdmin : false
    }
    
    db.get("users").push(newUser).write();
    res.redirect("/users")    
}

module.exports.getUpdate = (req,res) => {
    let user = db.get("users").find({id: req.params.id}).value();
    res.render("users/update", {
        user: user
    }) 
}

module.exports.update = (req,res) => {
    db.get('users')
        .find({ id: req.params.id })
        .assign({name: req.body.name, phone: req.body.phone})
        .write();
    res.redirect("/users")
}

module.exports.delete = (req,res) => {
    db.get('users').remove({id : req.params.id}).write()
    res.redirect("/users")
}