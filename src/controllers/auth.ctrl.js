const User = require('../models/user.model')
const Rol = require('../models/roles.model')
const jwt = require('jsonwebtoken')
require('../config/config')

const authCtrl = {}

authCtrl.register = async(req, res, next) => {
    const { name, lastName, email, pass, profileImg, rol } = req.body;
    const newUser = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: await User.encryptPassword(pass),
        profileImg: profileImg
    })
    if (rol) {
        const rolFound = await Rol.findOne({ name: rol });
        newUser.rol = rolFound._id;
    } else {
        const rol = await Rol.findOne({ name: "user" });
        newUser.rol = rol._id;
    }

    const savedUser = await newUser.save();

    res.status(200).json({
        ok: true,
        msg: "User registered OK",
        savedUser
    })
}

authCtrl.login = async(req, res, next) => {
    const userFound = await User.findOne({ emial: req.body.emial }).populate(
        "rol"
    );
    if (!userFound) {
        res.status(200).json({
            ok: false,
            msg: "User Not Found"
        });
    } else {
        const matchPassword = await User.comparePassword(req.body.pass, userFound.password);
        if (!matchPassword) {
            res.status(200).json({
                ok: false,
                token: null,
                message: "Invalid Password",
            });
        } else {
            const token = jwt.sign({ id: userFound._id }, process.env.SEED, {
                expiresIn: 7200, // 2hrs
            });
            res.json({
                ok: true,
                token
            });
        }
    }
}

module.exports = authCtrl