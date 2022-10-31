const express = require('express');
const inspectreportContoller = require('../controllers/inspectreport.controller');

const router = express.Router();

router.post("/", inspectreportContoller.save);
router.get("/:id", inspectreportContoller.show);
router.get("/", inspectreportContoller.index);
router.post("/:id", inspectreportContoller.update);
router.delete("/:id", inspectreportContoller.destroy);

module.exports = router;