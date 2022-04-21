const express = require("express")
const router = express.Router()

const user = require("../controllers/user.ctrl");

router.get("/getUsers", user.getUsers);

router.get("/getUserById", user.getUserById);

router.post("/updatePass", user.updatePass);

router.post("/updateImage", user.uploadImage);

router.delete("/deleteUser", user.deleteUser);

module.exports = router