const Task = require('../models/models');
const task = Task.task;
//rendering index file with data from db
module.exports.home = function(req,res){
    task.find({},function(err,taskList){
        if (err){
            console.log('err');
            return;
        }
        return res.render('index',{
            tasks: taskList
        }

        )
    })
}

//searching using description and querying the db
module.exports.homeSearch = function(req,res){
    task.find({"desc":{$regex : req.body.query}},function(err,taskList){
        if (err){
            console.log('err');
            return;
        }

        return res.render('index',{
            tasks: taskList
        }

        )
    })
}



