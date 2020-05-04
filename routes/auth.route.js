const express = require('express')
const router = express.Router()
const controller = require("../controllers/auth.controller")

router.get("/login", controller.login);

router.post("/login", controller.postLogin);

router.get("/logout", controller.logout);

router.post("/logout", controller.postLogout);

router.get("/register", controller.register);

router.post("/register", controller.postRegister);

module.exports = router;