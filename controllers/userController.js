const User = require("../models/user");
const Student = require("../models/student");

module.exports.home = async function(req,res){

    if (!req.isAuthenticated()) {
      return res.redirect("/users/login");
    }

    let students = await Student.find({});

    return res.render("home",{students});
}

// rendering the sign In page
module.exports.login = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.render("signin");
    }

    return res.redirect("/");
};


// rendering the sign up page
module.exports.signup = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.render("signup");
    }

    return res.redirect("/");
};

//creating the user from the data
module.exports.CreateUser = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirmpassword) {

        req.flash("error", "Please check your password again..");
        return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newuser = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      let result = await newuser.save();
      if (!newuser) {
        req.flash("error", "Error while creating the user");
        return res.redirect("back");
      }
      return res.redirect("/users/login");
    } 
    else {
      req.flash("error", "E-Mail Already present");
      return res.redirect("back");
    }
  } 
  catch (error) {
    req.flash("error", "Error while submitting the form");
    res.redirect("back");
  }
};

//signin and creating the session
module.exports.CreateSession = function (req, res) {
  req.flash("success", "Login Successfull");
  return res.redirect("/");
};

// signing out the user
module.exports.signout = function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    else{
      req.flash("success", "Log Out Successfull");
      return res.redirect('/');
    }
   
  });
};