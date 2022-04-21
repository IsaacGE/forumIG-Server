const User = require('../models/user.model');
const Rol = require("../models/roles.model");

const verifySingUp = {}

verifySingUp.checkDuplicateEmail = async(req, res, next) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email) {
            return res.status(401).json({
                ok: false,
                message: "The email already exists"
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

verifySingUp.checkRolesExisted = async(req, res, next) => {
    if (req.body.rol) {
        const checkRol = await Rol.findOne({ name: req.body.rol })
        if (!checkRol) {
            return res.status(400).json({
                message: `Role ${req.body.rol} does not exist`,
            });
        }
    }
    next();
};

module.exports = verifySingUp