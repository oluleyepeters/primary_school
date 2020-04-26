var mongoose = require('mongoose');

var classTeacherSchema=new mongoose.Schema({
    firstname:String,
    othername:String,
    surname:String,
    username:String,
    username_:String,
    phone_number:String,
    email:String,
    _section: String,
    id_:String,
    user_id: String,
    Class:Number,
    className:String,
    status: {type: String, default: 'active'}
})

var classTeacher=mongoose.model('classTeacher',classTeacherSchema);

module.exports=classTeacher;