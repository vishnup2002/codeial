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

const Task = mongoose.model('tasks',taskSchema);

module.exports = Task;