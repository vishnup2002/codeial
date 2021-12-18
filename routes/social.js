const express = require('express');
const socialController = require('../controllers/socialController');

const router = express.Router();

router.get('/',socialController.home);
router.use('/post',require('./posts'));

module.exports = router;