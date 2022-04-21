const express = require("express")
const router = express.Router()

const comment = require("../controllers/comments.ctrl");

router.get("/getComments", comment.getComments);

router.post("/createComment", comment.createComment);

router.put("/updateComment", comment.editComment);

router.delete("/deleteComment", comment.deleteComment);

module.exports = router