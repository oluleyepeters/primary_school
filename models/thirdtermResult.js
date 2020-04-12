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
    id:String,
	id_:String,
	_id_:String,
	__id : String,
    Section:String,
	subjects:[subjectSchema],
    Term:{type:String, default:'Third-Term'},
    termName:{type:String, default:'thirdtermResult'},        
	classTeacher:String,
	Class:Number,
	className:String,
	created_date:{
		type:Date, 
		default:Date.now
	} 
}) 

var thirdtermResult=mongoose.model('thirdtermResult',resultSchema);

module.exports=thirdtermResult;