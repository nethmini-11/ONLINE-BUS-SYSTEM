const express = require('express');
const journeyContoller = require('../controllers/journey.controller');

const router = express.Router();

router.post("/", journeyContoller.save);
router.get("/:id", journeyContoller.show);
router.get("/", journeyContoller.index);
router.post("/:id", journeyContoller.update);
router.delete("/:id", journeyContoller.destroy);

module.exports = router;