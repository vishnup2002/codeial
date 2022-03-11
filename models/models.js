const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

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
        required:true,

    },

    name:{
        type:String,
        required:true
    },

    avatar : {
        type:String,
        default:"/uploads/users/avatars/default"
    }
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })

//static methods
UserSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
UserSchema.statics.avatarPath = AVATAR_PATH;

const Task = mongoose.model('tasks',taskSchema);
const User = mongoose.model('user',UserSchema);

module.exports.task = Task;
module.exports.user = User;