const Rol = require('../models/roles.model')

const rolCtrl = {};

rolCtrl.getRolName = async(req, res, next) => {
    const id = req.query.idRol
    const rolName = await Rol.findById(id);
    res.json(rolName);
};

rolCtrl.getRolId = async(req, res, next) => {
    const name = req.query.nameRol
    const idRol = await Rol.findOne({ name: name });
    res.json(idRol);
};




module.exports = rolCtrl;