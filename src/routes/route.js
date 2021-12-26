const express = require('express');

const collegeController = require('../controllers/collegeController.js')

const internController = require('../controllers/internController.js')

const router = express.Router();

// College routes
router.post('/colleges', collegeController.createCollege);

router.get('/collegeDetails', collegeController.collegeDetails);

router.get('/collegeList', collegeController.getRegisterCollegeList);

// Intern routes
router.post('/interns', internController.createIntern);

router.get('/internsList', internController.getRegisterInternList);


module.exports = router;