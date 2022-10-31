const express = require('express');
const journeyContoller = require('../controllers/journey.controller');

const router = express.Router();

router.get("/:id", journeyContoller.find);

module.exports = router;