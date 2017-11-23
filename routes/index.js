var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('firstPage.ejs');
});

router.get('/information-trial1', function(req, res, next) {
  res.render('secondPage.ejs');
});

router.get('/trial1', function(req, res, next) {
  res.render('thirdPage.ejs');
});

router.get('/information-trial2', function(req, res, next) {
  res.render('forthPage.ejs');
});

router.get('/trial2', function(req, res, next) {
  res.render('test.ejs');
});

router.post('/login', function(req, res, next) {

    var name = req.body.name;
    var faculty = req.body.faculty;
    var option = req.body.option;

  res.send(true)

    
    
 

});

module.exports = router;
