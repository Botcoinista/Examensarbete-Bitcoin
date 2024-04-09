const { Schema, model } = require('mongoose');
// const { use } = require('../routes');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    }
    }, { timestamps: true });

    module.exports = model("User", userSchema);