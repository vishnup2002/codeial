const Models = require('../models/models');
const task = Models.task;

//rendering the form to add task
module.exports.taskForm = function(req,res){
    res.render('add_task');
}



//adding the data to db and redirecting to home page
module.exports.addTask = function(req,res){
    req.body.checked = false;
    task.create(req.body,function(err,newTask){
        
        console.log(req.body);
        if (err){
            console.log('error!!',err);
            return;
        }
        res.redirect('/');

    }
    )
};

//deleting a task
module.exports.deleteTask = function(req,res){
    var id = req.query.id;
    task.findByIdAndDelete(id,function(err){
        if (err){
            console.log(err);
            return;
        }
        return res.redirect('/');
    })
};

//updating the checkbox and saving in db
module.exports.updateCheckbox = function(req,res){
    var id = req.query.id;
    task.findOne({ _id: id }, function(err, reqtask) {
        reqtask.checked = !reqtask.checked;
        reqtask.save(function(err, updatedTask) {
            if (err){
                console.log(err);
                return;
            }
            res.redirect('back');
        });
    });
}