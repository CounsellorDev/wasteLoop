const express = require('express')
const router = express.Router()
const auth = require('../config/middlewares')
const isUser = auth.isUser
const Report = require('../models/report')
const User = require('../models/register')

router.get('/',(req, res)=>{
    res.render('pages/index')
})

router.route('/about').get((req, res)=>{
    res.render('pages/about')
})
router.route('/dashboard').get(isUser,async(req,res)=>{
    let user = req.user
    let userType = req.user.usertype
    let reportId = req.user.id
    await Report.find({'userId':reportId}).then(async(reports)=>{
        await Report.find().then(async(allReports)=>{
                res.render("pages/dashboard", { userType: userType, user, reports: reports, allReports});
        })
            .catch(err => {
                req.flash('error', 'sorry something went wrong')
                return res.redirect('back')
            })
    })
        .catch(err => {
            req.flash('error', 'sorry something went wrong')
            return res.redirect('back')
        })
    
})
router.route('/contact').get((req,res)=>{
    res.render('pages/contact')
})

router.route('/all-user').get(isUser,async(req, res)=>{
    let userType = req.user.usertype
    await User.find({'usertype':'user'}).then(async (allUser) => {
        res.render('pages/allUser', { userType , allUser})
    })
    .catch(err =>{
        req.flash('error', 'sorry something went wrong')
        return res.redirect('back')
    })
    
})

router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('success', 'logout successful')
    res.redirect('/')
    return
})

module.exports = router
