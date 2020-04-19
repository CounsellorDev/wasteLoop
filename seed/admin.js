const Admin = require('../models/admin')
const mongoose = require('mongoose')
const Mongodb = require('../config/db').MONGOURL
const bcrypt = require('bcryptjs')

mongoose.connect(Mongodb, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('database connected successfully')
}).catch((err)=>{
    console.log(err)
})

const newAdmin = new Admin({
    fullName:'Stephen Edache',
    email:'mishealezekiel4@gmail.com',
    password:'12345'
})

 bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) {
            console.log('hashing failed')
        }
        newAdmin.password = hash
        newAdmin.save().then(admin => {
            console.log('admin has been saved successfully', admin)
        }).catch(err => {
            console.log(err)
        })
    })
 })
