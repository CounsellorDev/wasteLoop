const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/register");
const bcrypt = require("bcryptjs");


//determines which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id); //in this case its the user.id
});

//use the user.id from the serializeUser to get the object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use("local", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallBack: false
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ "email": email });
    console.log(user)
    if (!user) {
      return done(null, false, { message: "No user with this email" });
    }

    bcrypt.compare(password, user.password, function (err, isMatch) {
      console.log('Does it math:', isMatch)
      if (!isMatch) {
        console.log("Password incorrect, please try again")
        return done(null, false, { message: "Password Incorrect Please Try Again" });
      }
      return done(null, user)
    });
  } catch (error) {
    return done(error, false);
  }
}));