const express = require('express')
const router = express.Router()
const userAuthenticated = require('../config/middlewares')

router.route('/').get((req, res)=>{
    res.render('pages/index')
})
router.route('/about').get((req, res)=>{
    res.render('pages/about')
})
router.route('/adminDash').get((req,res)=>{
    res.render('pages/adminDash')
})
router.route('/contact').get((req,res)=>{
    res.render('pages/contact')
})
router.route('/users').get(userAuthenticated,(req, res)=>{
    res.render('pages/users')
})




module.exports = router
