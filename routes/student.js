const express = require("express");
const passport = require("passport");
const router = express.Router();

const StudentController = require('../controllers/studentController');

// routes for showing the form
router.get("/create", passport.checkAuthentication, StudentController.createreq);

// routes for creating the student
router.post("/createstudent", passport.checkAuthentication, StudentController.createStudent);

// routes for viewing the student
router.get("/view/:id",passport.checkAuthentication, StudentController.viewdata);

// routes for updating the student
router.get("/update/:id",passport.checkAuthentication, StudentController.updatereq);

// routes for after updating
router.post("/modifydone",passport.checkAuthentication, StudentController.updtedone);

// routes for deleting the student
router.get("/delete/:id",passport.checkAuthentication, StudentController.deletedata);


module.exports = router;