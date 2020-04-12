var mongoose=require('mongoose');
var passportLocalmongoose=require('passport-local-mongoose')

const studentSchema=new mongoose.Schema({
    firstname:String,
    othername:String,
    surname:String,  
    Class:Number,
	active:{type:Boolean, default:true},
	className:String,
	_id_:String,
    id:String,
	token:String,
    username:String,
    username_:String,
    user_id:String,
    sectionId:String,
    guardians:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Guardians'
    }
    ]
})

studentSchema.plugin(passportLocalmongoose)

var Students=mongoose.model('Students',studentSchema);

module.exports=Students;