var mongoose=require('mongoose');
const { Schema }=mongoose

const subjectSchema=new Schema({
	subject:String,
	name: String,
	assignment:{type:Number, default:0},
	First_test:{type:Number, default:0}, 
	Second_test:{type:Number, default:0},
	Examination:{type:Number, default:0}
});

module.exports=subjectSchema;