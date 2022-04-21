const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    idUser: {
        type: String,
        required: [true, "ID user required"]
    },
    nameUser: {
        type: String,
        required: [true, "User Name is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);