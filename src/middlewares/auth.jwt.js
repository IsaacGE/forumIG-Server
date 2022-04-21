const jwt = require("jsonwebtoken")
require('../config/config')
const User = require("../models/user.model")
const Role = require('../models/roles.model')

const authJwt = {}

authJwt.verifyToken = async(req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, process.env.SEED);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

authJwt.isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const rol = await Role.find({ _id: user.rol });
        if (rol.name === "admin") {
            next();
            return;
        }

        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

module.exports = authJwt