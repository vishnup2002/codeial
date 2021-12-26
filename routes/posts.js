const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/postController');

router.post('/create-post',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports = router;