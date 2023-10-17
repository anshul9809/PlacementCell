// IMPORTING THE MODULES
const express = require('express')
const router = express.Router();

const UserControllers = require('../controllers/userController');

router.get('/', UserControllers.home);

// routes for user 
router.use('/users', require("./user"));

// routes for student
router.use('/student',require('./student'));

// routes for company
router.use("/company", require("./company"));

module.exports = router;