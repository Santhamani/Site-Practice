
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// var alert = require('alert');

var dburl = "mongodb://localhost:27017/careers";

//Get Careers Page
router.get('/careers', function(req, res, next) {
  MongoClient.connect(dburl, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('careers').find().toArray(function(err, docs){
      if(err)
        console.log(err);
      res.render('careers.ejs', {
                            msg : '',
                            data: docs,
                            pageId: 'careers',
                            pageTitle: 'Careers'
                          });
      db.close();
    });
  });
});

/* GET careers listing. */
router.get('/admin', function(req, res, next) {
      res.render('admin.ejs', {pageTitle:'Admin', pageId:'admin'});
});
  
 /* GET careers listing. */
router.post('/adminlogin', function(req, res, next) {
  console.log(req.body);
  if(req.body.email === 'santha.g@lakshyait.in' && req.body.password === 'hello220793'){
  MongoClient.connect(dburl, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('careers').find().toArray(function(err, docs){
      if(err) throw err;
      res.render('adminlogin.ejs', {data: docs,
      pageId: 'adminlogin',
      pageTitle: 'Admin Login'});
      db.close();
    });
  });
}
else{
  res.render('admin.ejs',{data:'err',pageId:'Admin',pageTitle:'admin'})
}
});

router.get('/fetchdata', function(req, res, next) {
   var id = req.query.id;
   MongoClient.connect(dburl, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('careers').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
      if(err) throw err;
      res.send(docs);
      db.close();
    });
  });
});

router.post('/add', function(req, res, next) {
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('careers');
    var careers = {'job_title': req.body.job_title, 'role': req.body.role, 'location': req.body.location, 'experience': req.body.experience, 'salary': req.body.salary, 'job_type': req.body.job_type, 'skills': req.body.skills, 'job_description': req.body.job_description};
    collection.insert(careers, function(err, result) {
    if(err) { throw err; }
     res.redirect('/adminlogin');
    });
    db.close();
  });
});
router.get('/adminlogin',function(req,res, next){
  MongoClient.connect(dburl, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('careers').find().toArray(function(err, docs){
      if(err) throw err;
      res.render('adminlogin.ejs', {data: docs,
      pageId: 'adminlogin',
      pageTitle: 'Admin Login'});
      db.close();
    });
  });
});
router.post('/edit', function(req, res, next) {
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('careers');
    //var careers = {'job_title': req.body.job_title, 'role': req.body.role, 'location': req.body.location, 'experience': req.body.experience, 'salary': req.body.salary, 'job_type': req.body.job_type, 'skills': req.body.skills, 'job_description': req.body.job_description};
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, {$set:{'job_title': req.body.job_title, 'role': req.body.role, 'location': req.body.location, 'experience': req.body.experience,'salary': req.body.salary,'job_type': req.body.job_type,'skills': req.body.skills, 'job_description': req.body.job_description }}, function(err, result) {
    if(err) { throw err; }
      db.close();
      res.redirect('/adminlogin');
     });
  });
});
router.get('/delete', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }

    db.collection('careers', function(err, careers) {
      careers.deleteOne({_id: new mongodb.ObjectID(id)});
      if (err){
         throw err;
       }else{
          db.close();
          res.redirect('/adminlogin');
       }
    });
      if(err) throw err;
  });
});

router.get('/logout',function(req,res,next){
  res.redirect('/admin');
});
module.exports = router;