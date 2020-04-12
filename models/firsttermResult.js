var mongoose=require('mongoose');
const subjectSchema=require('./subjects')

var resultSchema=new mongoose.Schema({
	student:{
    	id:{
    		type:mongoose.Schema.Types.ObjectId,
    		ref:'Students'
    	},
    	Name:String
    },
    Section:String,
    classTeacher:String,
    id:String,
	__id:String,
    id_:String,    
    _id_:String,
	className:String,
    Term:{type:String, default:'First-Term'},
    termName:{type:String, default:'firsttermResult'},    
	subjects:[subjectSchema],
	Class:Number,
	created_date:{
		type:Date, 
		default:Date.now
	} 
}) 

var firsttermResult=mongoose.model('firsttermResult',resultSchema);

module.exports=firsttermResult;