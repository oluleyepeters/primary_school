var express= require('express');
var router=express.Router();
var db=require('../models');
var Students=require('../models/students');
var passport=require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto') 
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


router.get('/',function(req,res){
    db.Section.find({})
    .then( sections => {
        res.render('section/section', {section:sections});
    })
    .catch((err) => { 
        res.redirect('/')
    })
})

router.get('/new' ,function(req,res){
    res.render('section/newSection');
});

router.post('/',function(req, res, next){
    db.Section.create(req.body)
    .then(section => {
        res.redirect('/sections')
    })
    .catch(console.log)
})

router.get('/:section',function(req, res){ 
    db.Section.findOne({section:req.params.section})
    .then((foundSection) => {
        res.render('section/showSection', {section:foundSection})
    })
})

router.get('/:section/edit',function(req, res, next){
    db.Section.findOne({section:req.params.section},function(err,section){
        if(err){
            console.log(err)
        }
    res.render('section/editSection',{section:section})
    }) 
})

router.put('/:id',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead,function(req,res){
 db.Section.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err, updated){
        if (err) throw err;
        res.json(updated);
    });
})

router.get('/:section/classTeacher',function(req, res){
    db.Section.findOne({section:req.params.section})
    .then((Section) => {    
        res.render('section/allClassTeachers', {section:Section})
    })
}) 

router.get('/:section/allclassteacher',function(req, res){
    db.Section.findOne({section:req.params.section})
    .then((Section) => {
        console.log(Section)
        return Section;
    }) 
    .then((Section) => {
        db.classTeacher.find({_section: req.params.section}).populate('classTeacher').exec(function(err,foundTeachers){
            if(err){
                console.log(err)
            }
            res.json(foundTeachers)
        })
    })
})

router.get('/:section/:username',function(req, res){
    db.Section.findOne({section:req.params.section})
    .then((Section) => {
        console.log(section)
        return Section;
    }) 
    .then((Section) => {
        db.classTeacher.findOne({username: req.params.username, _section: req.params.section}, function(err, foundTeacher){
            if(err){
                console.log(err)
            }
            res.json(foundTeacher)
        })
    })
})

router.put('/:section/:username/status',function(req, res){
    db.Section.findOne({section:req.params.section})
    .then((Section) => {
        return Section;
    }) 
    .then((Section) => {
        return db.classTeacher.findOne({username: req.params.username, _section: req.params.section})
    })    
    .then((user) => {
        user.status = req.body.status
        user.save()
        return user
    })
    .then((user) => {
        res.json(user)
    })
})

router.get('/:section/classteacher/new',function(req,res){
    db.Section.findOne({section:req.params.section})
    .then((section) => {
        res.render('classTeachers/newclassTeacher', {section: section})
    })     
})

router.post('/:section/classteacher',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var firstname=req.body.firstname;
    var lastname=req.body.surname;
    var token=createRandomString(20);
    var othername=req.body.othername;
    var phone_number=req.body.phone_number;
    var role="classTeacher";
    var email=req.body.email;
    var Class=req.body.class;
    var ClassName=req.body.className;    

    let val = req.body.className;

    val = val.slice(val.length-2,val.length)
    console.log(val)
    username_ = username + val;

    let sectionName;
    // var className=req.body.className;
    db.Section.findOne({section:req.params.section})
        .then(section => {
            sectionName = section
            return section
        })
        .then((section) => {
        db.classTeacher.findOne({ClassName:ClassName, _section:section.section})
        .then(classTeacher => {
            if(classTeacher){
                console.log('Teacher already exists')
                res.redirect('/sections/'+req.params.id+'/classteacher/new')            
            }else if(!req.body.class){
                res.redirect('/sections/'+req.params.id+'/classteacher/new')    
            }
            return 'classTeacher';
        })
        .then(() =>{
            let newclassTeacher; 
            let _id_;
            let classNameString;
            db.Class.findOne({className : ClassName, _section:sectionName.section})
            .then((className) => {
                if(className){
                    console.log('Teacher already exists')
                    res.redirect('/sections/'+req.params.section+'/classteacher/new')            
                }else if(!req.body.class){
                    res.redirect('/sections/'+req.params.section+'/classteacher/new')    
                }else{
                    db.Section.findOne({section:req.params.section})
                    .then((section) => {
                        if(!section){
                            console.log('An error occurred')                    
                        }else{
                            sectionName = section
                            const newUser = new db.User({
                                section: sectionName.section ,                       
                                username: username_,
                                role:role,
                                email:req.body.email,
                                password:hashPassword(req.body.password),
                                firstname : firstname,
                                othername : othername,
                                lastname :lastname,
                                token:token
                            })
                            newUser.save()
                            return newUser;                
                        }
                    })                
                    .then(newuser => {
                        classNameString = req.body.className
                        newclassTeacher = new db.classTeacher({
                            _section: sectionName.section,
                            firstname:firstname,
                            lastname:lastname,
                            othername:othername,
                            phone_number:phone_number,
                            email:email,
                            user_id: newuser._id,
                            username:username_,
                            username_:username,
                            className:classNameString,
                            Class:Class,
                            id_:req.params.id
                        })
                        section.classTeacher.push(newclassTeacher)
                        section.save()
                        _id_ = newclassTeacher._id
                        newclassTeacher.save()                      
                        return newclassTeacher;
                    })

                // .then(newclassTeacher => {
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
                //     return newclassTeacher;
                // })
                    .then(newclassTeacher => {
                        const newClass = new db.Class({
                            _section: sectionName.section,
                            Class: Class,
                            _id_ : newclassTeacher._id,
                            id_: req.params.id,
                            username : username_,
                            username_ : username,
                            user_id: newclassTeacher.user_id,
                            className: classNameString,
                            classTeacher: firstname + ' ' + lastname
                        })
                        newClass.save()
                        res.redirect(`/sections/${req.params.section}`)
                    })
                }
            })    
        })            
    })
})

router.get('/:section/classteacher/:username/edit',function(req,res){
    db.classTeacher.findOne(req.params.classid)
    .then((classTeacher) => {
        res.render('classTeachers/editclassTeacher',{section_id:req.params.id ,teacher:classTeacher})
    })
});

router.put('/:id/classteacher',middleware.headloggedin,middleware.checkAdmin || middleware.checkschoolHead,function(req,res){
 db.classTeacher.findByIdAndUpdate(req.params.classid,req.body,function (err, classteacher) {
        if (err) throw err;
        res.redirect('/sections/' + req.params.id);
    });
})

module.exports=router;