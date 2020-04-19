const mongoose = require("mongoose")
const { Schema } = mongoose


const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        default: 'admin'
    }
})
const User = mongoose.model('user', adminSchema)
module.exports = User;