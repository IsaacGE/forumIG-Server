const mongoose = require("mongoose");
const { Schema } = mongoose;

const privateMsgSchema = new Schema({
    idUser: {
        type: String,
        required: [true, "ID user required"]
    },
    message: {
        type: String,
        required: [true, "Message required"]
    },
    toUser: {
        type: String,
        required: [true, "ID to user required"]
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("PrivateChat", privateMsgSchema);