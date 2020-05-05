const cloudinary = require('cloudinary').v2;
const db = require('../db')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const User = require("../models/user.model")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const users = db.get("users").value();

module.exports.index = async (req,res) => res.render("users/index" ,{
    users: await User.find(),
})

module.exports.search = async (req,res) => {
    let users = await User.find();
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
    
    // db.get("users").push(newUser).write();
    await User.create(newUser)
    res.redirect("/users")    
}

module.exports.getUpdate = async (req,res) => {
    // let user = db.get("users").find({id: req.params.id}).value();
    let user = await User.findById(req.params.id)
    res.render("users/update", {
        user: user
    }) 
}

module.exports.update = async (req,res) => {
    // db.get('users')
    //     .find({ id: req.params.id })
    //     .assign({name: req.body.name, phone: req.body.phone})
    //     .write();
    await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone
    })
    res.redirect("/users")
}

// Profile user

module.exports.profile = (req, res) => {
    res.render("users/profile");
  };
  
  module.exports.postAvatar = async (req, res) => {
    // let user = db
    //   .get("users")
    //   .find({ id: req.body.id })
    //   .value();
    let user = User.findById(req.body.id)
    let file = await cloudinary.uploader.upload(req.file.path);
    console.log(file)
    // if (!user.avatar) {
    //   db.get("users")
    //     .find({ id: req.body.id })
    //     .set("avatar", file.url)
    //     .write();
    // } else {
    //   db.get("users")
    //     .find({ id: req.body.id })
    //     .assign({ avatar: file.url })
    //     .write();
    // }

    await await User.findByIdAndUpdate(req.body.id, { avatar: file.url });
    res.redirect("/users/profile");
  };

// Delete user

module.exports.delete = async (req,res) => {
    // db.get('users').remove({id : req.params.id}).write()
    await User.findByIdAndRemove(req.params.id);
    res.redirect("/users")
}