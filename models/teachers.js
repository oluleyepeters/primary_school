var mongoose=require('mongoose')

const teacherSchema=new mongoose.Schema({
    firstname:String,
    othername:String, 
    surname:String,
    phone_number:Number,
    email:String,
    path:{type:String}
})

var Teachers=mongoose.model('Teachers',teacherSchema);

module.exports = Teachers;