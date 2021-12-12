const express = require('express');
const router = express.Router();
const passport = require('passport');
router.use(express.urlencoded());
const homeController = require('../controllers/homeController');

router.get('/',passport.checkAuthentication,homeController.home);
router.post('/',homeController.homeSearch);
router.use('/task',passport.checkAuthentication,require('./tasks'));
router.use('/user',require('./user'));

module.exports = router;