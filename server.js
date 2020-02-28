// Dependencies
const mongoose = require("mongoose");
const path = require("path")
const expresshandlebars = require("express-handlebars")
const express = require('express')
const app = express()
const port = 5200
const bodyParser = require("body-parser")
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const passport = require('passport')
const logger = require('morgan')
const flash = require('connect-flash')
require("./config/passport").passport;

// ======setting up the morgan middleware====
app.use(logger('dev'))
// ======setting parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(
  session({
    cookie: {
      maxAge: 180 * 60 * 1000
    },
    secret: "dfskfgsdfbcdncdsfsgkflsfabdasduaegefdblakhslkjdfsjkdfbsdk",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);

// ====================initializepassport=====================
app.use(passport.initialize());
app.use(passport.session());

// ==========setting up flash/Environmental variables and middlewares
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success");
  res.locals.error_messages = req.flash("error");
  res.locals.user = req.user ? true : false;
  res.locals.session = req.session;
  next();
});

// ===== Express Handle bars
app.engine('.hbs', expresshandlebars({
    defaultLayout: 'layout',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))


// Database connections
mongoose.Promise = global.Promise;
const MONGO_URL = require("./config/db").MONGOURL;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(`Database Connection failed ${err.message}`));


// routes grouping
app.use('/', require('./routes/index'))
app.use('/', require('./routes/registerRoute'))
app.use('/', require('./routes/reportRoute'))


// configuring port
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`)
});
