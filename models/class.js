var mongoose=require('mongoose');

var classSchama=new mongoose.Schema({
    Class:Number,
    id_: String,
    _id_: String, 
    _section: String,
    username:String,
    username_:String,
    user_id: String,
    classTeacher:String,
	className:{type:String},
    Student:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Students'
    }
]
})

var Class=mongoose.model('Class',classSchama);

module.exports=Class;