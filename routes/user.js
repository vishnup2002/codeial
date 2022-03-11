const express = require('express');
const router = express.Router();
const passport = require('passport');

//router.use(express.urlencoded({extended:true}));
const userController = require('../controllers/user_controller');

router.post('/create-user',userController.createUser);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/update/:id',passport.checkAuthentication,userController.updateUser);
router.use('/home',require('./social'));

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local',
    {failureRedirect:'/user/sign-in'})
    ,userController.createSession);

router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate("google",{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession)

module.exports = router;


