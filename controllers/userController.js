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
    if (req.body.password != req.body.confirmpassword) {
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
      await newuser.save();

      if (!newuser) {
        console.log("error while creating new user");
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
    console.log(`Error during submitting the sigup form:  ${error}`);
    res.redirect("back");
  }
};

//signin and creating the session
module.exports.CreateSession = function (req, res) {
  req.flash("success", "Yayy !!! Logged In Successfully");
  return res.redirect("/");
};

// signing out the user
module.exports.signout = function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    else{
      req.flash("success", "Ooops !!! Logged Out Successfully");
      return res.redirect('/');
    }
   
  });
};