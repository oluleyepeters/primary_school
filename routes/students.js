var express= require('express');
var router=express.Router();
var db=require('../models');
var Students=require('../models/students');
var passport=require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto')
router.use(bodyParser.json()); 
var middleware=require("../middleware")
// var configTemplate2=require('../config/emailtemplates/student_forgetpassword');


// router.get('/forgotpassword' , async (req,res) => {
//     res.render('students/resetPassword')
//         });


// router.post('/forgotpassword', async (req,res) =>{
//         var email=req.body.email
//         const user= await db.Students.findOne({"email": req.body.email})
//           if(!user){
//             req.flash('error', 'Email Does not exist');
//             res.redirect('/login')
//           }else {
//             user.password=''
//             user.token = createRandomString(20);
//             user.active = false;
//             await user.save();
//             const mail = new Mail({
//                 title:'Password Reset',
//                 subject:'Reset Your Paaword',
//                 body:'Click the link below to reset your password',
//                 recipients:email,
//                 token:user.token            
//             })
//             const mailer= new Mailer(mail, config2Template(mail))
//             mailer.send();
//             mail.save();
//             res.render('students/password_act')      
//             }
//         })
            
 
// router.get('/forgotpassword/:token/resetPassword' , async (req,res) => {
//     const user=await db.Students.findOne({'token' : req.params.token});
//         if (!user){
//             req.flash('error', 'no user found')
//             res.redirect('/')
//         }else{
//             res.render('newpassword',{foundUser:user})
//             }
//         });


// router.put('/forgotpassword/:token' , async (req,res) => {
//     var hashedpassword=hashPassword(req.body.password)
//     const user=await Students.findOneAndUpdate({'token' : req.params.token},
//                 { "$set" : { password : hashedpassword } },
//                 { new : true });
//             if (!user){
//                 req.flash('error', 'Update cant be done')
//                     res.redirect('/')
//                 }else{
//                     user.active = true;
//                     user.token='';
//                     await user.save();
//                     res.redirect('/login')
//                     }
//                 });


router.get('/:id/dashboard',function(req,res){
    Students.findOne({user_id:req.params.id}, function(err,student){
        if(err) return res.redirect('/')
        res.render('students/student', {student:student})
    })
})

router.get('/:id/dashboard/result', function(req, res){
    let klassname, _klassStudent
    db.Students.findOne({user_id:req.params.id})
    .then(student => {
        _klassStudent = student
        // console.log(klass)
        return student
    })    
    .then((student) => {
        db.Class.findById(student.id)
        .then((klass) => {
            klassname = klass
            console.log(klass)
            return klass
        })
        .then((klassStudent) => {
        db.Section.findById(klassname.id_)
            .then((sektion) => { 
                console.log(sektion)
                // if((Date.now() < sektion.firsttermendDate) && (Date.now() <= sektion.secondtermstartDate)){
                    db.firsttermResult.findOne({id:_klassStudent._id, Section:sektion.section})
                    .then((result) => {
                        console.log(_klassStudent)
                        res.render('students/result' ,{result, student:_klassStudent})
                    })             
                // }else if((Date.now() < sektion.secondtermendDate) && (Date.now() <= sektion.thirdtermstartDate)){
                //     db.secondtermResult.findOne({id:klassStudent._id, Section:sektion.section })
                //     .then((result) => {
                //         console.log(result)
                //         res.render('classes/result' ,{result})                        
                //     })
                // }else{
                //     db.thirdtermResult.findOne({id:klassStudent._id, Section:sektion.section })
                //     .then((result) => {
                //         res.render('classes/result' ,{result})                        
                //         console.log(result)
                //     })
                // }    
            })
        })                
    })    
})


module.exports=router;