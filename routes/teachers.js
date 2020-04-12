var express= require('express');
var router=express.Router();
var db=require('../models');
var Students=require('../models/students');
var passport=require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto')
router.use(bodyParser.json());
var multer=require('multer');
var path=require('path')
var middleware=require('../middleware')
 
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+file.originalname)
    }
})

const upload=multer({
    storage:storage,
    limits:{fileSize:100000000},
    fileFilter:function(req,file,cb){
        checkFileType(file, cb)
    }
}).single('image')


function checkFileType(file,cb){
//    allowed ext
    const filetypes=/jpeg|jpg|png|gif/;
//    test
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    
    const mimetype=filetypes.test(file.mimetype)
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Images Only')
    }
}


router.get('/teachers', function(req,res){
    db.Teachers.find({}, function(err,teachers){
        res.render('teachers/allteachers', {teachers:teachers})
    })
})

router.get('/teachers/new', middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    res.render('teachers/new')
})


router.post('/teachers',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    upload(req,res,(err)=>{
    if(err){
        res.send(err)
    }else{
        if(req.file==undefined){
            console.log('Cannot Be undefined')
        }else{
            var fullpath='uploads/'+req.file.filename;
            db.Teachers.create({
                firstname:req.body.firstname,
                othername:req.body.othername,
                surname:req.body.surname,
                email:req.body.email,
                phone_number:req.body.phone_number,
                path:fullpath
            },function(err,teacher){
                if(err){
                    console.log(err)
                    res.redirect('/teachers')
                }
                teacher.save()
                res.redirect('/teachers')
            })
        }
    }
    })
})


router.get('/teachers/:id/edit',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    db.Teachers.findById(req.params.id, function(err,teacher){
        if(err){
            console.log(err)
            res.redirect('/teachers/'+req.params.id)
        }
        res.render('teachers/edit', {teacher:teacher})
    })
})


router.put('/teachers/:id',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    db.Teachers.findOneAndUpdate({_id:req.params.id},req.body.teacher,{new:true}, function(err,teacher){
        if(err) return next(err)
        res.redirect('/teachers')
    })
})


router.delete('/teachers/:id',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    db.Teachers.findOneAndRemove({_id:req.params.id}, function(err,teacher){
        if(err) return next(err)
        res.redirect('/teachers')
    })
})


module.exports=router