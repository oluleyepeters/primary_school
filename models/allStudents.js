var mongoose=require('mongoose');
const subjectSchema=require('./subjects')

var allstudentSchema = new mongoose.Schema({
    firstname:String,
    othername:String,
    surname:String,
    username:String,
    Result:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Results'
    }
    ]
})

// allstudentSchema.plugin(passportLocalmongoose)

var allstudents=mongoose.model('allstudents', allstudentSchema);

module.exports=allstudents;