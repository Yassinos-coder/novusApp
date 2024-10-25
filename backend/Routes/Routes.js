const express = require('express')
const jwtAuth = require('../Utils/jwtAuth');
const validateUser = require('../Utils/UserSanitizer');
const { signup } = require('../Controllers/userController');

const router = express.Router()

// User Registration Route
router.post('/signup', validateUser, signup);


module.exports = router;
