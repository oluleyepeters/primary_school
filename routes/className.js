var express= require('express');
var router=express.Router();
var db=require('../models');
var passport=require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto')
router.use(bodyParser.json());
var Mailer=require('../config/mailer');
var middleware=require('../middleware');  

router.get('/:username',function(req,res){
    db.Class.findOne({username:req.params.username})
    .then((foundClass) => {
        console.log(foundClass)
        res.render('classes/className',{foundClass})  
    })
    .catch((err) => {
        res.redirect('/')
    })    
});

router.get('/:foundClass/addstudent',function(req,res){
    db.Class.findOne({_id : req.params.foundClass})
    .then((foundClass) => {
        res.render('classes/newStudent',{foundClass})  
    })
    .catch((err) => {
        res.redirect('/')
    })    
});

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

router.post('/:foundClass',function(req, res){
    var firstname=req.body.firstname;
    var othername=req.body.othername;
    var surname=req.body.surname;
    var className_=req.body.classname_;
    var class_=req.body.class_;    
    var userName = req.body.username+class_;
    var username_ = req.body.username;    
    var token=createRandomString(20);
    var password=req.body.password;
    // var p6Subjects = 'Mathematics, English-Language'
    // var p5Subjects = 'Mathematics, English-Language'
    // var p4Subjects = 'Mathematics, English-Language'
    // var p3Subjects = 'Mathematics, English-Language'
    // var p2Subjects = 'Mathematics, English-Language'
    // var p1Subjects = 'Mathematics, English-Language'
    let foundClass, newStudent, foundStudent, results, founduser, newclassStudent, all_student, seenClass
    db.Class.findOne({_id : req.params.foundClass})
    .then((foundclass) => {
        foundClass = foundclass
        return foundClass
    })
    .then((foundClass) => {
        db.allstudents.findOne({username:username_})
        .then(all_Student => {
            all_student = all_Student
            if(all_Student){
                db.User.findOne({username:userName})
                .then(username => {
                    foundStudent = username;
                    if(username && (username.Class === foundClass.Class)){
                        console.log('student already exists')
                        res.redirect('/class/'+foundClass.username)
                    }else if(!username){
                        var hashedpassword = hashPassword(password)  
                        db.Class.findOne({_id : req.params.foundClass}) 
                        .then(classFound => {
                            seenClass = classFound
                            const newUser = new db.User({
                                section: seenClass._section ,                       
                                username: userName,
                                username_: username_,
                                role:'Student',
                                email:req.body.email,
                                password:hashPassword(req.body.password),
                                firstname : firstname,
                                othername : othername,
                                surname :surname,
                                token:token
                            })
                            newUser.save()
                            return newUser;
                        })
                        .then((newUser) => {                                
                            db.Students.create({
                                _id_:all_student._id,
                                id:seenClass._id,
                                username:userName,
                                username_:all_student.username,
                                othername:othername,
                                surname:surname,
                                user_id: newUser._id,
                                Class:class_,
                                className:className_
                            }, function(err, student){
                                if(err){
                                    console.log(err)
                                }else{
                                    if(parseInt(class_)===6){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 5){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 4){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 3){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 2){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 1){
                                        results = 'Mathematics, English-Language'
                                    }                                    
                                    var firstterm = new db.firsttermResult({
                                        id:student._id,
                                        id_:student._id_,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className: seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))
                                    })
                                    firstterm.save()
                                    var result = new db.Result({
                                        id:firstterm.id,
                                        id_:firstterm.id_,
                                        Term: firstterm.Term,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))                                            
                                    })
                                    result.save()
                                    all_Student.Result.push(result)
                                        // foundstudent.save()
                                    var secondterm = new db.secondtermResult({
                                        id:student._id,
                                        id_:student._id_,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))
                                    })
                                    secondterm.save()
                                    var result2 = new db.Result({
                                        id:secondterm.id,
                                        id_:secondterm.id_,
                                        Term: secondterm.Term,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))                                            
                                    })
                                    result2.save()
                                    all_Student.Result.push(result2)
                                        // foundstudent.save()
                                    var thirdterm = new db.thirdtermResult({
                                        id:foundstudent._id,
                                        id_:foundstudent._id_,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))
                                    })
                                    thirdterm.save()
                                    var result3 = new db.Result({
                                        id:thirdterm.id,
                                        id_:thirdterm.id_,
                                        Term: thirdterm.Term,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))                                            
                                    })
                                    result3.save()
                                    all_Student.Result.push(result3)
                                    all_Student.save()  
                                }    
                            })
                        })
    
                    }
                })    
            }else if(!all_Student){
                db.Class.findOne({_id : req.params.foundClass})
                .then((classFound) => {
                    seenClass = classFound 
                    const newstudent = new db.allstudents({
                        username:username_,
                        firstname:firstname,
                        othername:othername,
                        surname:surname,
                        })
                    newStudent = newstudent
                    newstudent.save()   
                    return newstudent            
                })
                .then((newstudent) => {
                    const newUser = new db.User({
                        section: seenClass._section ,                       
                        username: userName,
                        username_: username_,
                        role:'Student',
                        email:req.body.email,
                        password:hashPassword(req.body.password),
                        firstname : firstname,
                        othername : othername,
                        surname :surname,
                        token:token
                    })
                    newUser.save()
                    return newUser;
                })                
                .then((newUser) => {
                    var hashedpassword = hashPassword(password)    
                    db.Students.create({
                        _id_:newStudent._id,
                        id:seenClass._id,
                        username:userName,
                        username_:newStudent.username,
                        othername:othername,
                        surname:surname,
                        user_id: newUser._id,
                        Class:class_,
                        className:className_
                        }, function(err, student){
                            if(err){
                                console.log(err)
                            }else{
                                newclassStudent = student
                                db.allstudents.findById(student._id_)
                                .then((foundstudent) => {
                                    console.log(foundstudent)
                                    if(parseInt(class_)===6){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 5){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 4){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 3){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 2){
                                        results = 'Mathematics, English-Language'
                                    }else if(parseInt(class_) === 1){
                                        results = 'Mathematics, English-Language'
                                    }
                                    var firstterm = new db.firsttermResult({
                                        id:newclassStudent._id,
                                        id_:newStudent._id,
                                        // classteachers._id
                                        _id_:seenClass._id_,
                                        // class id which is section._id and classteacher.id
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))
                                    })
                                    firstterm.save()
                                    var result = new db.Result({
                                        id:firstterm.id,
                                        id_:firstterm.id_,
                                        Term: firstterm.Term,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section:seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))                                            
                                    })
                                    result.save()
                                    foundstudent.Result.push(result)
                                        // foundstudent.save()
                                    var secondterm = new db.secondtermResult({
                                        id:newclassStudent._id,
                                        id_:newStudent._id,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))
                                    })
                                    secondterm.save()
                                    var result2 = new db.Result({
                                        id:firstterm.id,
                                        id_:firstterm.id_,
                                        Term: secondterm.Term,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))                                            
                                    })
                                    result2.save()
                                    foundstudent.Result.push(result2)
                                        // foundstudent.save()
                                    var thirdterm = new db.thirdtermResult({
                                        id:newclassStudent._id,
                                        id_:newStudent._id,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))
                                    })
                                    thirdterm.save()
                                    var result3 = new db.Result({
                                        id:firstterm.id,
                                        id_:firstterm.id_,
                                        Term: thirdterm.Term,
                                        _id_:seenClass._id_,
                                        __id:seenClass.id,
                                        Section: seenClass._section,
                                        className:seenClass.className,
                                        classTeacher:seenClass.classTeacher,
                                        subjects:results.split(',').map(subject => ({ subject : subject.trim()}))                                            
                                    })
                                    result3.save()
                                    foundstudent.Result.push(result3)
                                    foundstudent.save()                                                                                
                                    res.redirect('/class/'+foundClass.username)
                                })
                            }
                        })
                    })  
                }                                
            })
        }) 
    })                    
         

router.get('/:foundclass/allStudents' , (req,res) => {
    db.Class.findById(req.params.foundclass)
    .then((foundclassroom) => {
        console.log(foundclassroom._id)
        res.render('classes/allStudents',{foundclass : foundclassroom})
    }) 
})    

router.get('/:foundclass/allStudent' , (req,res) => {
    db.Class.findById(req.params.foundclass)
    .then((foundclassroom) => {
        console.log(foundclassroom)
        return foundclassroom;
    }) 
    .then((foundclass) => {
        db.Students.find({id: foundclass._id}).populate('Student').exec(function(err,foundStudents){
            if(err){
                console.log(err)
            }
            res.json(foundStudents)
            // res.render('classes/allStudents', {foundclass:foundclass, students:foundStudents})
        })
    })
}) 

router.get('/:foundclass/:student/result', function(req, res){
    let klassname, _klassStudent
    db.Class.findById(req.params.foundclass)
    .then(klass => {
        klassname = klass
        console.log(klass)
        return klass
    })    
    .then((klass) => {
        db.Students.findById(req.params.student)
        .then((klassStudent) => {
            _klassStudent = klassStudent;    
            console.log(klassStudent)                   
            return klassStudent  
        })
        .then((klassStudent) => {
        db.Section.findOne({section: klassname._section})
            .then((sektion) => { 
                console.log(sektion)
                // if((Date.now() < sektion.firsttermendDate) && (Date.now() <= sektion.secondtermstartDate)){
                    db.firsttermResult.findOne({id:klassStudent._id, Section:sektion.section})
                    .then((result) => { 
                        console.log(_klassStudent)
                        res.json(result)
                        // res.render('classes/result' ,{result, student:_klassStudent})
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

router.get('/:foundclass/:student/result/:result/', function(req, res){
    let klassname, _klassStudent
    db.Class.findById(req.params.foundclass)
    .then(klass => {
        klassname = klass
        console.log(klass)
        return klass
    })    
    .then((klass) => {
        db.Students.findById(req.params.student)
        .then((klassStudent) => {
            _klassStudent = klassStudent;    
            console.log(klassStudent)                   
            return klassStudent  
        })
        .then((klassStudent) => {
        db.Section.findOne({section: klassname._section})
            .then((sektion) => { 
                console.log(sektion)
                // if((Date.now() < sektion.firsttermendDate) && (Date.now() <= sektion.secondtermstartDate)){
                    db.firsttermResult.findOne({id:klassStudent._id, Section:sektion.section})
                    .then((result) => { 
                        console.log(_klassStudent)
                        res.json(result)
                        // res.render('classes/result' ,{result, student:_klassStudent})
                    })             
            })
        })                
    })    
})

router.get('/:foundclass/:student/result/:resultId/:termName/edit',function(req, res,){
    let resultTerm = (req.params.termName)
    if(resultTerm === "firsttermResult"){
        db.firsttermResult.findById(req.params.resultId)
        .then((result) => {
            res.render('classes/editresult' ,{result})
        })             
    }else if(resultTerm === "secondtermResult"){
        db.secondtermResult.findById(req.params.resultId)
        .then((result) => {
            res.render('classes/result' ,{result})
        })             
    }else{
        db.thirdtermResult.findById(req.params.resultId)
        .then((result) => {
            res.render('classes/editresult' ,{result})
        })             
    }
})

router.put('/:foundclass/:student/result/:resultId/:termName/',function(req, res,){
    db.Class.findOne({_id_: req.params.foundclass})
    .then((foundKlass) => {
        let score, category, subjectName
        console.log(req.body)
        let resultTerm = (req.params.termName)
        if(resultTerm === "firsttermResult"){
            db.firsttermResult.findById(req.params.resultId)
            .then((result) => {
                for(let i = 0; i < result.subjects.length; i++){
                    for(let index in req.body){
                        if((req.body.hasOwnProperty(index)) && result.subjects[i].subject.includes(index.split('-')[0])){
                            if(index.split('-').length === 2){
                                subjectName = index.split('-')[0]
                                category = index.split('-')[1]
                                score = parseInt(req.body[index])
                                switch(category){
                                    case 'assignment':
                                        result.subjects[i].assignment = score;
                                        break;
                                    case 'First_test':
                                        result.subjects[i].First_test = score;
                                        break;
                                    case 'Second_test':
                                        result.subjects[i].Second_test = score;
                                        break;   
                                    case 'Examination':
                                        result.subjects[i].Examination = score;
                                        break;
                                }
                            }else if(index.split('-').length > 2){
                                subjectName = index.split('-')[0]+'-'+index.split('-')[0]
                                category = index.split('-')[2]
                                score = parseInt(req.body[index])
                                switch(category){
                                    case 'assignment':
                                        result.subjects[i].assignment = score;
                                        break;
                                    case 'First_test':
                                        result.subjects[i].First_test = score;
                                        break;
                                    case 'Second_test':
                                        result.subjects[i].Second_test = score;
                                        break;   
                                    case 'Examination':
                                        result.subjects[i].Examination = score;
                                        break;
                                }
                            }
                        }
                    }                    
                }
                result.save()
                return result
            })
            .then((result) => {
                db.Result.findOne({id_:result.id_})
                .then((result) => {
                for(let i = 0; i < result.subjects.length; i++){
                    for(let index in req.body){
                        if((req.body.hasOwnProperty(index)) && result.subjects[i].subject.includes(index.split('-')[0])){
                            if(index.split('-').length === 2){
                                subjectName = index.split('-')[0]
                                category = index.split('-')[1]
                                score = parseInt(req.body[index])
                                switch(category){
                                    case 'assignment':
                                        result.subjects[i].assignment = score;
                                        break;
                                    case 'First_test':
                                        result.subjects[i].First_test = score;
                                        break;
                                    case 'Second_test':
                                        result.subjects[i].Second_test = score;
                                        break;   
                                    case 'Examination':
                                        result.subjects[i].Examination = score;
                                        break;
                                }
                            }else if(index.split('-').length > 2){
                                subjectName = index.split('-')[0]+'-'+index.split('-')[0]
                                category = index.split('-')[2]
                                score = parseInt(req.body[index])
                                switch(category){
                                    case 'assignment':
                                        result.subjects[i].assignment = score;
                                        break;
                                    case 'First_test':
                                        result.subjects[i].First_test = score;
                                        break;
                                    case 'Second_test':
                                        result.subjects[i].Second_test = score;
                                        break;   
                                    case 'Examination':
                                        result.subjects[i].Examination = score;
                                        break;
                                }
                            }
                        }
                    }                    
                    }
                    result.save()
                    return result                    
                })
                .then((result) => {
                    res.json(result)
                })
            })             
        // }else if(resultTerm === "secondtermResult"){
        //     db.secondtermResult.findById(req.params.resultId)
        //     .then((result) => {
        //         res.render('classes/result' ,{result})
        //     })             
        // }else if(resultTerm === "thirdtermResult"){
        //     db.thirdtermResult.findById(req.params.resultId)
        //     .then((result) => {
        //         res.render('classes/editresult' ,{result})
        //     })             
        }        
    })
})    

module.exports=router;