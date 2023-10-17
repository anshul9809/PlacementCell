const express = require("express");
const passport = require("passport");
const router = express.Router();

const UserController = require("../controllers/userController");
const DownloadController = require("../controllers/downloadController");

//crating the routes

// routes for user login
router.get("/login", UserController.login);

// routes for users signup
router.get("/SignUp", UserController.signup);

// routes for user SignOut
router.get("/SignOut", passport.checkAuthentication, UserController.signout);

// routes for user create
router.post("/create", UserController.CreateUser);


//using passport for authenication
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/users/login" }),
    UserController.CreateSession
);

// routes for fetching data
router.get(
    "/fetchdata", 
    passport.checkAuthentication, 
    DownloadController.downloadfile
);

module.exports = router;