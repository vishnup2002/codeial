const express = require('express');
const router = express.Router();
router.use(express.urlencoded());
const homeController = require('../controllers/homeController');


router.get('/',homeController.home);
router.post('/',homeController.homeSearch);
router.use('/task',require('./tasks'));
router.use('/user',require('./user'));

module.exports = router;