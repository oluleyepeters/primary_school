var express= require('express');
var router=express.Router({mergeParams:true});
var db=require('../models');
var Students=require('../models/students');
var passport=require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto')
router.use(bodyParser.json());
var multer=require('multer')
var path=require('path');
var middleware=require('../middleware')

const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+file.originalname)
    }
})

//init upload

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

router.get('/',function(req,res){
    db.News.find({}, function(err, allinformations){
        if(err){
            console.log(err)
        }else
        res.render('info/allnews',{informations:allinformations})
    })
})

router.get('/new',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    res.render('info/new')
    })


router.get('/:id' , function(req,res){
    db.News.findById(req.params.id, function(err,foundinformation){
        if(err){
            console.log(err)
        }else{
            res.render('info/news',{information:foundinformation})
        }
    })
})


router.post('/',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    upload(req,res,(err)=>{
    if(err){
        res.send(err)
    }else{
        if(req.file==undefined){
            console.log('Cannot Be undefined')
        }else{
            var fullpath='/uploads/'+req.file.filename;
            db.News.create({
                title:req.body.title,
                content:req.body.content,
                path:fullpath
            },function(err,news){
                if(err){
                    req.flash('error','An error Occurred')
                }
                news.save()
                res.redirect('/info')
            })
        }
    }
    })
})



router.get('/:id/edit',middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    db.News.findById(req.params.id,function(err,foundnews){
        res.render('info/edit',{information:foundnews})
    })
})



router.put('/:id',middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    db.News.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,news){
        if(err){
            console.log(err)
            res.redirect('/info')
        }
        res.redirect('/info')
    })
})


router.delete('/:id',middleware.checkAdmin || middleware.checkschoolHead, function(req,res){
    db.News.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect('/info/:id')
        }
        res.redirect('/info')
    })
})



module.exports=router;