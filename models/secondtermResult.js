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
	subjects:[subjectSchema],
    Section:String,
	className:String,
    id:String,
	id_:String,
	_id_:String,
	__id: String,
	classTeacher:String,
    Term:{type:String, default:'Second-Term'},
    termName:{type:String, default:'secondtermResult'},        
	Class:Number,
	created_date:{
		type:Date, 
		default:Date.now
	} 
}) 

var secondtermResult=mongoose.model('secondtermResult',resultSchema);

module.exports=secondtermResult;