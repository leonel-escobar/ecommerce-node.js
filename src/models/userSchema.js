const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    cartId: {
        type: String,
        required: true
    }
});

module.exports = userSchema;