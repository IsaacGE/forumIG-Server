const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolSchema = new Schema({
    name: {
        type: String,
        required: [true, "Rol Name required"]
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("Rol", rolSchema);