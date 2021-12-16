const express = require('express');

const router = express.Router();
//router.use(express.urlencoded({extended:true}));
const taskController = require('../controllers/task_controller');

router.get('/task-form',taskController.taskForm);
router.post('/add-task',taskController.addTask);
router.get('/delete-task',taskController.deleteTask);
router.get('/update-checkbox',taskController.updateCheckbox);

module.exports = router;