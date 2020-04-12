var mongoose=require('mongoose')

const newsSchema=new mongoose.Schema({
    title:String,
    created:{type:Date, default:Date.now()}, 
    content:String,
    path:{type:String}
})

var News=mongoose.model('News',newsSchema);

module.exports = News;