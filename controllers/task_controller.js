const task = require('../models/tasks');


module.exports.taskForm = function(req,res){
    res.render('add_task');
}

module.exports.addTask = function(req,res){
    req.body.checked = false;
    task.create(req.body,function(err,newContact){
        
        console.log(req.body);
        if (err){
            console.log('error!!',err);
            return;
        }
        console.log(newContact);
        res.redirect('/');

    }
    )
};

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