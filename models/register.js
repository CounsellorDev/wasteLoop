const mongoose = require("mongoose")
const {Schema} = mongoose


const userSchema = new Schema({
    // registration
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }, 
    active: Boolean
})
const User = mongoose.model('User', userSchema)
module.exports = User;