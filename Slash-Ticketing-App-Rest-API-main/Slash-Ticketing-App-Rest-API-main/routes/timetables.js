const express = require('express');
const timetableContoller = require('../controllers/timetable.controller');

const router = express.Router();

router.post("/", timetableContoller.save);
router.get("/:id", timetableContoller.show);
router.get("/", timetableContoller.index);
router.post("/:id", timetableContoller.update);
router.delete("/:id", timetableContoller.destroy);

module.exports = router;

