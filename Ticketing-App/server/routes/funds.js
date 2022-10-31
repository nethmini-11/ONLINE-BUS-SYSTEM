const express = require('express');
const fundsController = require('../controllers/funds.controller');

const router = express.Router();


router.post("/:id", fundsController.recharge);
router.post("/withdraw/:id", fundsController.withdraw);
router.post("/check/:id", fundsController.check);
router.post("/update/:id", fundsController.update);

module.exports = router;