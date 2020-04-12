var middlewareobj={};
var db=require('../models')


middlewareobj.studentloggedin=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/students/login')
}


middlewareobj.headloggedin=function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/head/login')
    }



middlewareobj.checkTeacher6=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class == parseInt(6))){
            db.classTeacher.findOne({id:req.params.id},function(err,head){
                if(head){
                    return next();
                }else{
                    res.redirect('/head/login')
                }
            })
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkTeacher5=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class == parseInt(5))){
            db.classTeacher.findOne({id:req.params.id},function(err,head){
                if(head){
                    return next();
                }else{
                    res.redirect('/head/login')
                }
            })
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkTeacher4=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class == parseInt(4))){
            db.classTeacher.findOne({id:req.params.id},function(err,head){
                if(head){
                    return next();
                }else{
                    res.redirect('/head/login')
                }
            })
        }else{
            res.redirect('/head/login')
        }
    })
}

middlewareobj.checkTeacher3=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class == parseInt(3))){
            db.classTeacher.findOne({id:req.params.id},function(err,head){
                if(head){
                    return next();
                }else{
                    res.redirect('/head/login')
                }
            })
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkTeacher2=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class == parseInt(2))){
            db.classTeacher.findOne({id:req.params.id},function(err,head){
                if(head){
                    return next();
                }else{
                    res.redirect('/head/login')
                }
            })
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkTeacher1=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class == parseInt(1))){
            db.classTeacher.findOne({id:req.params.id},function(err,head){
                if(head){
                    return next();
                }else{
                    res.redirect('/head/login')
                }
            })
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkschoolHead=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.username === "oluleyepeters")){
            return next()
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkAdmin=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.role === "admin")){
            return next()
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkHead=function(req,res,next){
    db.Head.findById(req.user._id,function(err,head){
        if(head && (head.Class === parseInt(6))){
            return next()
        }else{
            res.redirect('/head/login')
        }
    })
}


middlewareobj.checkteacher=function(req,res,next){
    db.classTeacher.findOne({_id:req.user.id},function(err,head){
        if(head){
            return next()
        }else{
            res.redirect('/head/login')
        }
    })
}

//
module.exports=middlewareobj;