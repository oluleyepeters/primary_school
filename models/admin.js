var mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
	email:String,
    firstname:String,
    othername:String,
    lastname:String,        
    user_id: String,
    username:String,
    status: {type: String, default: 'active'}
});

var Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;