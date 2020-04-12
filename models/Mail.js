var mongoose=require('mongoose')

const mailSchema=new mongoose.Schema({
	username:String,
    title:String,
    created:{type:Date, default:Date.now()}, 
    subject:String,
    token:String,
    recipients:String,
    body:String
})

var Mail=mongoose.model('Mail',mailSchema);

module.exports = Mail;