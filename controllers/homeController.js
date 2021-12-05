const task = require('../models/tasks');


module.exports.home = function(req,res){
    task.find({},function(err,taskList){
        if (err){
            console.log('err');
            return;
        }

        console.log(taskList);

        return res.render('index',{
            tasks: taskList
        }

        )
    })
}

module.exports.homeSearch = function(req,res){
    console.log(req.body);
    task.find({"desc":{$regex : req.body.query}},function(err,taskList){
        if (err){
            console.log('err');
            return;
        }

        console.log(taskList);

        return res.render('index',{
            tasks: taskList
        }

        )
    })
}

