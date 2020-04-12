var express=require('express'),
    db=require('./models'),
    News=require('./models/news'),
    Students=require('./models/students'),
    app= express(),
    cookieSession=require('cookie-session'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser'),
    passport=require('passport'),
    methodOverride=require('method-override'),
    flash=require('connect-flash'),
    passportLocalmongoose=require('passport-local-mongoose'),
    morgan=require('morgan'),
    multer= require('multer'),
    path=require('path'),
    keys=require('./config/keys')

require('./passport');

mongoose.connect(keys.mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('Connection Error'))

mongoose.promise=global.Promise;

app.use(morgan('dev'))
app.use(methodOverride('_method') )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.use(cookieSession({
    name:'session',
    keys:['Eminiballer'],
    maxAge:24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
})

// var teachersRoutes=require('./routes/teachers.js')
var userRoutes=require('./routes/users') 
var sessionRoutes=require('./routes/sections') 
var classRoutes=require('./routes/className') 
var studentRoutes=require('./routes/students') 
var adminRoutes=require('./routes/admin') 
var resultRoutes=require('./routes/result') 

// var classTeacherRoutes=require('./routes/classTeachers')
// var studentRoute=require('./routes/students')
// var infoRoutes=require('./routes/info')
// var headRoutes=require('./routes/admin')
app.get('/',function(req,res){
    db.News.find({}).sort({_id:-1}).limit(1).exec(function(err,news){
    // if(err) return next(err);
    res.render('Home_page',{info:news}) 
    console.log(news);
    })
}); 

app.use('/users', userRoutes)
app.use('/sections', sessionRoutes)
app.use('/class', classRoutes)
app.use('/student', studentRoutes)
app.use('/admin', adminRoutes)
app.use('/allstudents', resultRoutes) 
// app.use('/sections/:id/classteacher', classTeacherRoutes)
// app.use('/students',studentRoute)
// app.use('/info',infoRoutes)
// app.use('/head', adminRoutes)
// app.use('/', teachersRoutes) 


var PORT=process.env.PORT || 8080
app.listen(PORT, function(req,res){
    console.log('Server is running')
})