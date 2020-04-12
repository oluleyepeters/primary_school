var express= require('express');
var router=express.Router();
var passport = require('passport')

router.get('/login',function(req,res){
    res.render('users/login')
})

router.post('/login',passport.authenticate('local',
    {
        successRedirect:'/sections',
        failureRedirect:'/users/login',
        failureFlash:true
    })  ,function(req,res){
});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success','logged you out');
    res.redirect('/')
})

// router.get('/verify/:token', async (req,res)=>{
//     const user=await db.Head.findOne({'token':req.params.token});
//     if(!user){
//         req.flash('error','no user found')
//         res.redirect('/')
//     }else{
//         user.active=true;
//         user.token='';
//         await user.save();
//         res.render('head/activated')
//     }
// })
 

// router.get('/forgotpassword' , async (req,res) => {
//     res.render('head/resetPassword')
//         });

// router.post('/forgotpassword', async (req,res) =>{
//         var email=req.body.email
//         const user= await db.Head.findOne({"email": req.body.email})
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
//             res.render('head/password_act')      
//             }
//         })
            
    

// router.get('/forgotpassword/:token/resetPassword' , async (req,res) => {
//     const user=await db.Head.findOne({'token' : req.params.token});
//         if (!user){
//             req.flash('error', 'no user found')
//             res.redirect('/')
//         }else{
//             res.render('newpassword',{foundUser:user})
//             }
//         });


// router.put('/forgotpassword/:token' , async (req,res) => {
//     var hashedpassword=hashPassword(req.body.password)
//     const user=await db.Head.findOneAndUpdate({'token' : req.params.token},
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
 

module.exports = router;