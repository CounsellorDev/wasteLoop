// this page covers the user's report
const express = require('express')
const router = express.Router()
const newReport = require('../models/report')


router.route('/report').get((req, res)=>{
    res.render('pages/report')
}).post(async(req, res)=>{

    const {fullName, phoneNo, address, pickUpDay, pickUpTime, details} = req.body
    const Report = new newReport({ fullName, phoneNo, address, pickUpDay, pickUpTime, details})
    // console.log(rep)
    
    await Report.save().then(report =>{
        console.log('report saved successfully', report)
        req.flash('success', 'your waste report was sent successfully')
        res.redirect('back')
        return
    }).catch(err=>{
        console.log(err)
        return req.flash('error', 'an error occured while sending your report please try again')
    })

})

module.exports = router