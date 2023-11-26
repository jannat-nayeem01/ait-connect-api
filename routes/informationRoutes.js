// informationRoutes.js
const express = require('express');
const router = express.Router();
const informationController = require('../controllers/informationController');

// Create new information
router.post('/information', informationController.createInformation);

// Get all information
router.get('/information', informationController.getAllInformation);

// Add more routes as needed

module.exports = router;
