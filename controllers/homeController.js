const Models = require('../models/models');
const user = Models.user;
const task = Models.task;
//rendering index file with data from db
module.exports.home = function(req,res){
    user.findById(req.cookies.user_id,function(err,User){
        if (err){
            console.log(err);return;
        }

        if (!User){
            return res.redirect('/user/sign-in')
        }
        else{
            task.find({},function(err,taskList){
                if (err){
                    console.log('err');
                    return;
                }
                
                return res.render('index',{
                    tasks: taskList
                })
            })
        
        }   


    
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

