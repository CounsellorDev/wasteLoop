const mongoose = require("mongoose")
const {Schema} = mongoose


const reportSchema = new Schema({
    // registration
    fullName:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    pickUpDay:{
        type: Date,
        required: true
    },
    pickUpTime:{
        type: String,
        required: true
    },
    details:{
        type: String,
        unique: true
    }
})
const Report = mongoose.model('Report', reportSchema)
module.exports = Report;