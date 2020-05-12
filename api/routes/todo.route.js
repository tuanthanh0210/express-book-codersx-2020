const express = require("express");

const controller = require("../controllers/todo.controller");

const router = express.Router();

router.get("/todos", controller.index);

router.get("/todos/search", controller.search)

router.post("/todos", controller.create);

router.post("/todos/:id", controller.update);

router.get("/todos/:id/delete", controller.delete);

module.exports = router;
