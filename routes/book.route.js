const express = require('express')
const router = express.Router()
const db = require('../db')
const shortid = require('shortid')
const controller = require("../controllers/book.controller")

router.get("/", controller.index)

router.get("/search", controller.search)

router.post("/create" , controller.postCreate)

router.get("/:id/update", controller.getUpdate)

router.post("/:id/update", controller.update)

router.get("/:id/delete", controller.delete)

module.exports = router;