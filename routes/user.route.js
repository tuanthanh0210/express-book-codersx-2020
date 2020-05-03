const express = require('express')
const router = express.Router()
const controller = require("../controllers/user.controller")
const validate = require("../validates/user.validate")


router.get("/", controller.index)
  
router.get("/search", controller.search)
  
router.post("/create" ,validate.postCreate, controller.postCreate)
  
router.get("/:id/update", controller.getUpdate)
  
router.post("/:id/update", controller.update)
  
router.get("/:id/delete", controller.delete)
  
module.exports = router;