const express = require('express')
const router = express.Router()
const controller = require("../controllers/transaction.controller")

router.get("/", controller.index);

router.get("/search", controller.search)

router.post("/", controller.postCreate);

router.get("/:id/complete", controller.complete)

module.exports = router;