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
  res.render('thirdPage.ejs',{name : req.session.name});
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

    var value =[[  
        req.body.name,
        req.body.faculty,
         req.body.option
    ]]
    

    sheets.submit(value, (err) => {
      if(!err)
        res.send(false);
    });

    res.send(true);

});



module.exports = router;
