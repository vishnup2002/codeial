const express = require('express');
const router = express.Router();
router.use(express.urlencoded());
const task = require('../models/tasks')
const taskController = require('../controllers/task_controller');

router.get('/task-form',taskController.addTask);
router.post('/add-task',function(req,res){
    task.create(req.body,function(err,newContact){
        console.log(req.body);
        if (err){
            console.log('error!!');
            return;
        }
        console.log(newContact);
        res.redirect('/');
    })
});

module.exports = router;