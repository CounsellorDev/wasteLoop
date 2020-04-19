// this page covers the user's report
const express = require('express')
const router = express.Router()
const newReport = require('../models/report')
const User = require('../models/register')
const moment = require('moment')

// ==============waste report get route==============
router.get('/report',(req, res)=>{
    let user = req.user
        res.render('pages/report',{user})
    })
// =====waste report post route===============
router.post('/report/:id',async(req, res)=>{
    let id = req.params.id
    console.log(id)
    //================formatting the date.now() method using moment===================
    const date = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
    console.log(date);

    // =======formatting the date=================
     let pickUpDay = req.body.pickUpDay;
     let pickUpDayFormat = moment(pickUpDay).format("MMMM Do YYYY");

    //  ==================collecting the data to be saved i.e creating a new instance of the report================
   await User.findById(id).then(async(user) =>{
        let Report = new newReport({ 
            address: req.body.address, 
            pickUpDay: pickUpDayFormat, 
            pickUpTime:req.body.pickUpTime, 
            details:req.body.details,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber, 
            email: user.email,
            date:date,
            userId:user.id
         })

        //  =============saving the report tp the database=================
        await Report.save().then(report => {
            console.log('report saved successfully', report)
            req.flash('success', 'your waste report was sent successfully')
            res.redirect('/success')
            return
        }).catch(err => {
            console.log(err)
            return req.flash('error', 'an error occured while sending your report please try again')
        })
    })


})


// ========success get Route===============
router.get('/success', (req, res)=>{
    let userReport = req.user
    res.render('pages/success', {userReport})
})

module.exports = router