const express = require('express')
const router = express.Router()
const controller = require("../controllers/user.controller")
const validate = require("../validates/user.validate")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.get("/", controller.index)
  
router.get("/search", controller.search)
  
router.post("/create" ,validate.postCreate, controller.postCreate)
  
router.get("/:id/update", controller.getUpdate)
  
router.post("/:id/update", controller.update)
  
router.get("/:id/delete", controller.delete)

router.get("/profile", controller.profile);

router.post("/profile/avatar", upload.single("avatar"), controller.postAvatar);
  
module.exports = router;