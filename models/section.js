var mongoose=require('mongoose');

var sectionSchema= new mongoose.Schema({
	section: String,
	startDate: {type: Date},
	endDate: {type: Date},
	firsttermstartDate : {type: Date},
	firsttermendDate : {type: Date},
	secondtermstartDate : {type: Date},
	secondtermendDate : {type: Date},
	thirdtermstartDate : {type: Date},
	thirdtermendDate : {type: Date},					
    classTeacher:[
	    {
    	    type:mongoose.Schema.Types.ObjectId,
        	ref:'classTeacher'
    	}
	],
	admin:[
	    {
    	    type:mongoose.Schema.Types.ObjectId,
        	ref:'admin'
    	}
	],	
	classes:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:'class'
		}
	]
})

var Section=mongoose.model('Section',sectionSchema)

module.exports=Section;