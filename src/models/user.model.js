const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "user Name required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name required"]
    },
    email: {
        type: String,
        required: [true, "email required"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    activeUser: {
        type: Boolean,
        default: true
    },
    profileImg: {
        type: String,
    },
    rol: {
        ref: "Rol",
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    timestamps: true,
});

userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model("User", userSchema);