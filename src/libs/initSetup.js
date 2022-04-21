const Rol = require('../models/roles.model')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const initSetupLib = {}

initSetupLib.createRoles = async() => {
    try {
        const count = await Rol.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Rol({ name: "user" }).save(),
            new Rol({ name: "admin" }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

initSetupLib.createAdmin = async() => {
    const user = await User.findOne({ email: "admin@forumIG.admin.com" });
    const roles = await Rol.find({ name: "admin" });

    if (!user) {
        await User.create({
            name: "Admin",
            lastName: "Administrador",
            email: "admin@forumIG.admin.com",
            password: await bcrypt.hash("admin", 10),
            rol: roles._id,
        });
        console.log('Admin User Created!')
    }
}

module.exports = initSetupLib