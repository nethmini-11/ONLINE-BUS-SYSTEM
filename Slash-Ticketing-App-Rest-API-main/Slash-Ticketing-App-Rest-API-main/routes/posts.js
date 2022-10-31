const express = require('express');
const postContoller = require('../controllers/post.controller');

const router = express.Router();

router.post("/", postContoller.save);
router.get("/:id", postContoller.show);
router.get("/", postContoller.index);
router.patch("/:id", postContoller.update);
router.delete("/:id", postContoller.destroy);

module.exports = router;