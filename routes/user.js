const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded());
const userController = require('../controllers/user_controller');

router.post('/create-user',userController.createUser);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local',
    {failureRedirect:'/user/sign-in'})
    ,userController.createSession);

module.exports = router;

router.get('/sign-out',userController.destroySession);
