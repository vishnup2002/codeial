const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/create-post',postController.create);

module.exports = router;