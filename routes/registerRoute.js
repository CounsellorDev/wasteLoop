// this page covers the user registrations
const express = require('express')
const router = express.Router()
const User = require('../models/register')
const Joi =require('@hapi/joi')
const bcrypt = require('bcryptjs')
const passport = require('passport')


const userSchema = Joi.object({
  fullName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.string(),
  email: Joi.string().email(),
  phoneNumber:Joi.string().required(),
  address:Joi.string().required(),
});


router.route('/register')
    .get((req, res)=>{
         res.render('pages/register')
    })
    .post(async(req, res,next) => {
        try{
            // ======using joi to validate the user input===========
            const result = await userSchema.validateAsync(req.body);
            if(result.error){
                console.log('error validating user')
            }
        
            // ==============validating useremail=============
            const userEmail = await User.findOne({email:result.email})
            if(userEmail){
                console.log('email already exist in our database')
                req.flash('error', 'email alredy registerd')
                return
            }

            const userNumber = await User.findOne({phoneNumber:result.phoneNumber})
            if(userNumber){
                req.flash('error', 'PhoneNumber already registered')
                return
            }

            if(result.password !== result.confirmPassword){
                console.log('password misatch')
                req.flash('error', 'password mismatch')
                res.redirect('/register')
                return
            }

            // =======creating a new instance of every user============
            const newUser = new User(result);

            //==========password hash then saving to the database======
            await bcrypt.genSalt(10,(err,salt) =>{
                    bcrypt.hash(newUser.password, salt,(err, hash) =>{
                        if(err){
                            console.log('hashing failed')
                        }
                        newUser.password = hash
                         newUser.save().then(user=>{
                            console.log('newUser has been saved successfully', user)
                            req.flash('success', 'user registered successfully please login')
                            return res.redirect('/login')
                        }).catch(err =>{
                            console.log(err)
                 })
            })
         })   

        }catch(error) {
            next(error)
        }
   
})

router.get('/login',(req, res) => {
    res.render("pages/login")
  })
router.post("/login", (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/users",
      failureRedirect: "/",
      successFlash:true,
      failureFlash:true
    })(req, res);
  });

router.get('/logout', (req, res)=>{
    req.logOut()
    req.flash('success', 'logout successful')
    res.redirect('/')
    return
})

module.exports = router