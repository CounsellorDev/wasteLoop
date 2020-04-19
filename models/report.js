const mongoose = require("mongoose")
const {Schema} = mongoose


const reportSchema = new Schema({
    // registration
    fullName:{
        type: String,
        required: true,
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
    pickUpDay:{
        type: String,
        required: true
    },
    pickUpTime:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required:false
    },
    date:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
const Report = mongoose.model('Report', reportSchema)
module.exports = Report;