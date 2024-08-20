const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verify, isLoggedIn } = require("../auth");

// User registration
router.post('/register', userController.registerUser);

// User authentication
router.post('/login', userController.loginUser);

module.exports = router;