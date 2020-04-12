var mongoose=require('mongoose')

const guardianSchema=new mongoose.Schema({
    fathers_guardians_name:String,
    fathers_guardians_phone_no:Number,
    fathers_guardians_address:String,
    fathers_guardians_email:String,
    mothers_guardians_name:String,
    mothers_guardians_phone_no:Number,
    mothers_guardians_address:String,
    mothers_guardians_email:String
});

var Guardians=mongoose.model('Guardians',guardianSchema);

module.exports=Guardians;