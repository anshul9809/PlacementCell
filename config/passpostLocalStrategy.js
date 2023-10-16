//PASSPORT LOCAL STRATEGY IN OUR REQUEST
const passport = require('passport');
const LocalStrategy   = require("passport-local").Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function (email, password, done) {
        //finding the user and establishing the identity
        User.findOne({email: email})
        .then(user => {
            if (!user || user.password != password) {
            console.log('Invalid Username or Password');
            return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log('error in finding user at passport');
            return done(err);
        });
    }
));

// serializing the user to decide to decide the cookie key
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing user from the key in the 

passport.deserializeUser(function (id, done) {
    User.findById(id)
    .then(user=>{
        return done(null, user);
    })
    .catch(err=>{
        console.log('error in finding user --> passport');
        return done(err);
    })
});

// checck if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
      return next();
    }
    // if the user is not signed in
    return res.redirect('/users/login');
};
  
//set the authenicated user for views
passport.setAuthenticatedUser = function (req, res, next) {
    if(req.isAuthenticated()){
      // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
      res.locals.user = req.user;
    }
    next();
};