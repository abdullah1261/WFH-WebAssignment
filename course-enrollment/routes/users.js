var express = require('express');
var router = express.Router();

// Import the corresponding controller functions
const { login, signup } = require('../controllers/userController');

// Route for user login
router.post('/login', login);

// Route for user signup
router.post('/signup', signup);
module.exports = router;
