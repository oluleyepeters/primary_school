var mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
	username:String,
    username_:String,
    password:String,
    role:String,
    section: String,
    email: String,
    firstname: String,
    lastname: String,
    othername: String,
    active:{type:Boolean, default:true},
    token:String
});

var User=mongoose.model('User',userSchema);

module.exports=User;