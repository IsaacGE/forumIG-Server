const express = require("express")
const router = express.Router()

const privateMsg = require("../controllers/privateMsg.ctrl");

router.get("/private/getComments", privateMsg.getComments);

router.post("/private/createComment", privateMsg.createComment);

router.put("/private/updateComment", privateMsg.editComment);

router.delete("/private/deleteComment", privateMsg.deleteComment);


module.exports = router