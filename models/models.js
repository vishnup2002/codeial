const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    category:{
        type:String,
        required:true,
    },

    checked:{
        type:Boolean,
        required:true
    }
})

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Task = mongoose.model('tasks',taskSchema);
const User = mongoose.model('user',UserSchema);

module.exports.task = Task;
module.exports.user = User;