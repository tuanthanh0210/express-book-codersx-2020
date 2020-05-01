const express = require('express')
const router = express.Router()
const db = require('../db')
const shortid = require('shortid')

const users = db.get("users").value();

router.get("/", (req,res) => res.render("users/index" ,{
    users: users
  }))
  
router.get("/search", (req,res) => {
    let q = req.query.q;
    let filterUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render("users/index", {
        users: filterUsers,
        q : q
    })
  })
  
router.post("/create" , (req,res) => {
    let id = shortid.generate();
    let newUser = {
        id: id,
        name: req.body.name,
        phone: req.body.phone
    }
    db.get("users").push(newUser).write();
    res.redirect("/users")    
  })
  
router.get("/:id/update", (req,res) => {
    let user = db.get("users").find({id: req.params.id}).value();
    res.render("users/update", {
        user: user
    }) 
  })
  
router.post("/:id/update", (req,res) => {
    db.get('users')
        .find({ id: req.params.id })
        .assign({name: req.body.name, phone: req.body.phone})
        .write();
    res.redirect("/users")
  })
  
router.get("/:id/delete", (req,res) => {
    db.get('users').remove({id : req.params.id}).write()
    res.redirect("/users")
  })
  
module.exports = router;