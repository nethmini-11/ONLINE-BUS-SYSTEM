const express = require('express');
const inspectedbusContoller = require('../controllers/inspectedbus.controller');

const router = express.Router();

router.post("/", inspectedbusContoller.save);
router.get("/:id", inspectedbusContoller.show);
router.get("/", inspectedbusContoller.index);
router.post("/:id", inspectedbusContoller.update);
router.delete("/:id", inspectedbusContoller.destroy);

module.exports = router;