const express = require('express');
const authController = require('../controllers/authContoller');
//const authMiddleware = require('../middleware/authMiddleware');




const router = express.Router();
//signup and login related routes

router.post('/signup', authController.signup);
router.post('/login', authController.login);



module.exports = router;
