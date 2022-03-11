const express = require('express');
const router = express.Router();
const passport = require('passport');
//router.use(express.urlencoded({extended:true}));
const homeController = require('../controllers/homeController');

router.get('/',passport.checkAuthentication,homeController.home);
router.post('/',homeController.homeSearch);
router.use('/task',passport.checkAuthentication,require('./tasks'));
router.use('/user',require('./user'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api'));
router.use('/likes',require('./likes'));
router.get('/api/user_data', function(req, res) {

    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json(req.user);
    }
});
module.exports = router;