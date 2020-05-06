const express = require("express");

const controller = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/users", controller.index);

router.get("/users/:id/delete", controller.delete);

module.exports = router;
