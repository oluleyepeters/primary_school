var express= require('express');
var router=express.Router({mergeParams:true});
var db=require('../models');
var Students=require('../models/students');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
router.use(bodyParser.json());
var middleware=require('../middleware')

router.get('/', function(req,res){
	res.render('allstudents/students')
})

router.get('/:username', (req ,res) => {
    db.allstudents.findOne({'username':req.params.username})
    .populate("Result")
    .then(student => {
        console.log(student)
        res.json(student)
    })
})

module.exports = router