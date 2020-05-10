const express = require("express");

const controller = require("../controllers/book.controller.js");

const router = express.Router();

router.get("/books", controller.index);

router.get("/books/search", controller.search)

router.post("/books", controller.create);

router.get("/books/:id/delete", controller.delete);

module.exports = router;
