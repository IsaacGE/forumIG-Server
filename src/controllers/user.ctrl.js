const User = require("../models/user.model");

const userCtrl = {};

userCtrl.getUsers = async(req, res, next) => {
    await User.find()
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                count: users.length,
                users
            })
        })
};


userCtrl.getUserById = async(req, res, next) => {
    const id = req.query.id
    const user = await User.findById(id);
    res.json({
        ok: true,
        user
    });
};

userCtrl.uploadImage = async(req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
        ok: true,
        status: "image upload success"
    });
};

userCtrl.deleteUser = async(req, res) => {
    const id = req.query.id;
    const activeUser = req.query.activeUser;
    try {
        if (!id || id.length < 24) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'ID user is invalid ',
                cont: {
                    id: id | null
                }
            });
        }
        if (activeUser != 'false' && activeUser != 'true') {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Invalid value for the key active, must be true or false',
                cont: {
                    activeUser: activeUser || null
                }
            });
        }
        const user = await User.findByIdAndUpdate(id, { $set: { activeUser } }, { new: true });
        if (!user) {
            return res.status(404).json({
                ok: false,
                resp: 404,
                msg: `The user you try to ${activeUser === 'true' ? 'activate' : 'desactivate'} does not exist.`,
                cont: {
                    user
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: `The user has ${activeUser === 'true' ? 'activated' : 'desactivated'} successfully.`,
            cont: {
                user
            }
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: `Error to ${activeUser === 'true' ? 'activate' : 'desactivate'} the user.`,
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
};



userCtrl.updatePass = async(req, res, next) => {
    const userFound = await User.findById(req.body.id)
    const matchPassword = await User.comparePassword(req.body.pass, userFound.password);
    if (!matchPassword) {
        res.status(200).json({
            ok: false,
            message: "Invalid Password",
        });
    } else {
        await User.findByIdAndUpdate(req.body.id, { $set: { password: await User.encryptPassword(req.body.newPass) } }, { new: true })
        res.status(200).json({
            ok: true,
            msg: "password updated success!"
        });
    }
}

module.exports = userCtrl;