const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Define the routes and their corresponding controller methods
router.get('/campaigns', campaignController.getAllCampaigns);
router.get('/campaigns/:id', campaignController.getCampaignById);
router.put('/campaigns/:id', campaignController.editCampaign);

module.exports = router;
