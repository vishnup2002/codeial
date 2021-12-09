const express = require('express');
const router = express.Router();
router.use(express.urlencoded());
const userController = require('../controllers/user_controller');

router.post('/create-user',userController.createUser);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
module.exports = router;
