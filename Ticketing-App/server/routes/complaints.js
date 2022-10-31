const express = require('express');
const complaintController = require('../controllers/complaint.controller');

const router = express.Router();

router.post("/", complaintController.save);
router.get("/:id", complaintController.show);
router.get("/", complaintController.index);
router.patch("/:id", complaintController.update);
router.delete("/:id", complaintController.destroy);

module.exports = router;