var express = require('express');
var router = express.Router();


var session = require('express-session');
var sheets = require('../main.js');

router.use(session({
    secret: 'ProjectHip',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
  
  if (req.session.name)
    return next();
  else
    return res.redirect('/');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('firstPage.ejs');
});

router.get('/information-trial1',auth, function(req, res, next) {
  res.render('secondPage.ejs',{name : req.session.name});
});

router.get('/trial1',auth, function(req, res, next) {
  res.render('thirdPage.ejs',{name : req.session.name, index :req.session.index });
});

router.get('/information-trial2',auth, function(req, res, next) {
  res.render('forthPage.ejs',{name : req.session.name});
});

router.get('/trial2',auth, function(req, res, next) {
  res.render('test.ejs',{name : req.session.name});
});

router.post('/login', function(req, res, next) {

    req.session.name    = req.body.name;
    req.session.faculty = req.body.faculty;
    req.session.option  = req.body.option;


     sheets.getindex((err, data) => {
      if(err){
        console.log("Err");
         res.send(false);
      }else{
        var index = data;
        req.session.index = parseInt(index);
        res.send(true);
      }
    });
    // var value =[[  
    //     req.body.name,
    //     req.body.faculty,
    //     req.body.option
    // ]]
    

    // sheets.submit(value, (err) => {
    //   if(!err)
    //     res.send(false);
    // });

    

});

router.post('/answercorrect', function(req, res, next) {

    req.session.answer1 = req.body.answer1;
    req.session.answer2 = req.body.answer2;
    

    res.send(true);
    
});


router.post('/confirm', function(req, res, next) {

    req.session.answer3 = req.body.answer;
    var pic=""
    if(req.session.index%2){
      pic= "รูปแผนที่ถูก"
    }else{
      pic= "รูปแผนที่ผิด"      
    }

    var value =[[  
        req.session.name,
        req.session.faculty,
        req.session.option,
        req.session.answer1,
        req.session.answer2,
        req.session.answer3,
        pic
        
    ]]
    

    sheets.submit(value, (err) => {
      if(!err)
        res.send(false);
      else
        res.send(true);
    });

    

});



module.exports = router;
