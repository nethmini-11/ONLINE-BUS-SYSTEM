const express = require('express');
const loginContoller = require('../controllers/login.controller');

const router = express.Router();

router.post("/", loginContoller.index);

module.exports = router;