const express = require("express");
const passport = require("passport");
const router = express.Router();

const CompanyController = require('../controllers/companyController');

// routes for company
router.get("/", passport.checkAuthentication, CompanyController.companyhome);

// routes for allocateinterview"
router.get("/allocateinterview", passport.checkAuthentication, CompanyController.allocateInterview);

// routes for scheduleInterview
router.post("/scheduleInterview",passport.checkAuthentication,CompanyController.scheduleInterview);

// routes for updating the record
router.post("/update/:id",passport.checkAuthentication,CompanyController.updateRecords);

module.exports = router;