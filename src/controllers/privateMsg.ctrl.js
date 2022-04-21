const PrivateMsg = require("../models/privateComm.model");

const privateMsgCtrl = {};

privateMsgCtrl.getComments = async(req, res, next) => {
    const comments = await PrivateMsg.find()
    res.status(200).json({
        ok: true,
        status: 200,
        comments
    })
};

privateMsgCtrl.createComment = async(req, res, next) => {
    const comment = new PrivateMsg({
        idUser: req.body.idUser,
        message: req.body.message,
        toUser: req.body.toUser
    });
    console.log(comment)
    await comment.save();
    res.json({
        status: "comment send success",
        comment
    });
};

/*
privateMsgCtrl.getCita = async(req, res, next) => {
    const { id } = req.params;
    const cita = await Cita.findById(id);
    res.json(cita);
};
*/

privateMsgCtrl.editComment = async(req, res, next) => {
    const { id } = req.params;
    await PrivateMsg.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
        ok: true,
        status: "Comment Updated success",
    });
};

privateMsgCtrl.deleteComment = async(req, res) => {
    const idComment = req.query.idComment;
    const active = req.query.active;
    try {
        if (!idComment || idComment.length < 24) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'ID comment is invalid ',
                cont: {
                    idComment: idComment | null
                }
            });
        }
        if (active != 'false' && active != 'true') {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Invalid value for the key active, must be true or false',
                cont: {
                    active: active || null
                }
            });
        }
        const comment = await PrivateMsg.findByIdAndUpdate(idComment, { $set: { active } }, { new: true });
        if (!comment) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `The comment you try to ${active === 'true' ? 'activate' : 'desactivate'} does not exist.`,
                cont: {
                    comment
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: `The comment has ${active === 'true' ? 'activated' : 'desactivated'} successfully.`,
            cont: {
                comment
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: `Error to ${active === 'true' ? 'activate' : 'desactivate'} the comment.`,
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
};

module.exports = privateMsgCtrl;