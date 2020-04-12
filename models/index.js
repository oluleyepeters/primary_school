var mongoose=require('mongoose');

mongoose.set('debug',true);

mongoose.connect("mongodb://localhost/school_website");

mongoose.promise=global.Promise;

module.exports.firsttermResult=require('./firsttermResult');

module.exports.secondtermResult=require('./secondtermResult');

module.exports.thirdtermResult=require('./thirdtermResult');

module.exports.Students=require('./students');

module.exports.allstudents=require('./allStudents');

module.exports.Guardians=require('./guardians');

module.exports.Teachers=require('./teachers.js');

module.exports.Class=require('./class.js');

module.exports.classTeacher=require('./classTeacher.js');

module.exports.Section=require('./section.js');

module.exports.Result=require('./result.js');

module.exports.Mail=require('./Mail.js');

module.exports.News=require('./news.js');

module.exports.Admin=require('./admin.js');

module.exports.User=require('./user.js');
