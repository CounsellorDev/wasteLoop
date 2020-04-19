// this page covers the user registrations
const express = require('express')
const router = express.Router()
const User = require('../models/register')
const Joi =require('@hapi/joi')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// ======@hapi/joi schema validation==============
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
                return req.flash('error','sorry something went wrong')
            }
        
            // ==============validating useremail=============
            const userEmail = await User.findOne({email:result.email})
            if(userEmail){
                console.log('email already exist in our database')
                req.flash('error', 'email alredy registered')
                return res.redirect('/register')
            }

            // ====================validating userNumber===============
            const userNumber = await User.findOne({phoneNumber:result.phoneNumber})
            if(userNumber){
                console.log('phone number already exist registered')
                req.flash('error', 'PhoneNumber already registered')
                res.redirect('/register')
                return
            }
// ========checking if the password matches==============
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

// =====login get route=========
router.get('/login',(req, res) => {
    if(res.locals.user){
        res.redirect('/')
    }
    res.render("pages/login")
  })

// ==============login post route================
router.post("/login", (req, res,next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      successFlash:true,
      failureFlash:true
    })(req, res,next);
  });

module.exports = router