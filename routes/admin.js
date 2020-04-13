var express= require('express');
var router=express.Router({mergeParams:true});
var db=require('../models');
var Students=require('../models/students');
var passport=require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Mailer=require('../config/mailer');
var crypto = require('crypto');
var configTemplate=require('../config/emailtemplates/activate');
var configTemplate2=require('../config/emailtemplates/forgetPassword');
router.use(bodyParser.json());
var middleware=require('../middleware')

function hashPassword(str){
    hashingSecret="fuckoff"
    var hash= crypto.createHmac('sha256',hashingSecret).update(str).digest('hex');
    return hash    
} 

function createRandomString(strlength){
    var possiblecharacters='abcdefghijklmnopqrstuvwxyz';
    var str='';
    for(i=1;i<=strlength;i++){
        var randomChar=possiblecharacters.charAt(Math.floor(Math.random()*possiblecharacters.length))
        str+=randomChar   
    }
    return str;
}

// Get all the admins
router.get('/',function(req, res){
    res.render('admin/allAdmin')
})    

router.get('/allAdmin',function(req, res){
    db.Admin.find({})
    .then((foundAdmin) => {
        res.json(foundAdmin)
    })
})    

router.get('/new',function(req,res){
    res.render('admin/newAdmin')    
})

router.post('/', async (req,res)=>{
    var username=req.body.username
    var password=req.body.password
    var firstname = req.body.firstname
    var othername = req.body.othername
    var lastname = req.body.lastname 
    var email=req.body.email
    var role='Admin'
    const user=await db.User.findOne({'username':req.body.username})
    if(user){
        req.flash('error','Username already in Use')
        res.redirect('/admin/new')
    }else{
        db.Admin.find({})
        .then(admin => {
            return admin
        })
        .then((admin) => {
            var token=createRandomString(20);
            const newUser = new db.User({
                username: username,
                role:role, 
                email:req.body.email,
                password:hashPassword(req.body.password),
                firstname : firstname,
                othername : othername,
                lastname :lastname,
                token:token
            })
            newUser.save()
            return newUser
        })
        .then((newUser) => {
            db.Admin.create({
                firstname:req.body.firstname,
                othername:req.body.othername,
                lastname:req.body.surname,                                    
                username:req.body.username,
                user_id: newUser._id,
                phone_number: req.body.phone_number,
                email:req.body.email,
                password:hashPassword(req.body.password),
            }, function(err,head){
                if(err){
                    console.log(err);
                    res.redirect('/admin/new')
                // }else{
                //     const mail=new db.Mail({
                //         title:'Email Confirmation',
                //         subject:'Confirm Your Email',
                //         body:'click the link below to confirm your account',
                //         recipients:email,
                //         token:token,
                //         username:username
                //     })
                //     console.log(token)
                //     const mailer=new Mailer(mail, configTemplate(mail))
                //     mailer.send();
                //     mail.save();
                //     res.render('head/activation')
                }res.redirect('/admin')
            })
        })
    }
})

router.get('/:username/',function(req,res){
    db.Admin.findOne({username:req.params.username})
    .then((foundAdmin) => {
        res.render('admin/admin',{admin:foundAdmin})
    }) 
});

// router.get('/:username/edit',function(req,res){
//     db.Admin.findOne({username:req.params.username})
//     .then((foundAdmin) => {
//         res.render('admin/editAdmin',{admin:foundAdmin})
//     }) 
// });

router.put('/:username/status',function(req,res){
    db.Admin.findOne({username:req.params.username})
    .then((user) => {
        user.status = req.body.status
        user.save()
        return user
    })
    .then((user) => {
        res.json(user)
    })
})

// router.put('/:username/edit',function(req,res){
//     db.Admin.findOneAndUpdate({username:req.params.username}, req.body, function(err,updated){
//         if(err){
//             console.log(err)
//         }else{
//             db.User.findOneAndUpdate({username:req.params.username})
//             .then(updated => {
//                 res.redirect('/admin/'+updated.username)
//             })
//         }
//     })
// });

router.delete('/:username/delete',function(req,res){
    db.Admin.findOneAndRemove({username:req.params.username}, function(err,teacher){
        if(err){
            return next(err)    
        }else{
            db.User.findOneAndRemove({username:req.params.username}, function(err,teacher){
                if(err){
                    return next(err)
                }else{
                    res.json('Deleted')
                }
            })
        } 
    })
})

module.exports=router;