const express = require('express');
const socialController = require('../controllers/socialController');
const passport = require('passport');
const router = express.Router();

router.get('/',socialController.home);
router.use('/post',require('./posts'));
router.get('/profile/:id',passport.checkAuthentication,socialController.profile);

module.exports = router;