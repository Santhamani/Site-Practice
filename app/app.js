
var express = require('express');
var app = express();
var dataFile = require('./data/data.json');
var homeFile = require('./data/homedata.json');
// var io = require('socket.io')();
const nodemailer = require('nodemailer');
var flash = require('connect-flash');
var mongodb = require('mongodb');

multer = require('multer'),
upload = multer(),
fs = require('fs'),
path = require('path');

var MongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017/careers";


app.set('port', process.env.PORT || 3030) // set the environment variable for the application
app.set('appData',dataFile);
app.set('view engine','ejs');
app.set('views','app/views');

app.locals.siteTitle = 'Lakshya IT Consulting';
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'));
app.use(express.static('app/views'));
app.use(require('./routes/index'));      
app.use(require('./routes/aboutus'));
app.use(require('./routes/services'));
app.use(require('./routes/contact'));
app.use(require('./routes/api'));
app.use(require('./routes/careers'));
app.use(require('./routes/technologies'));
app.use(flash());

var server = app.listen(app.get('port'),function(){
        console.log('Listenig to' + app.get('port'));
});

// create reusable transporter object using the default SMTP transport--from mailid
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'snth.ammu@gmail.com',
        pass : 'ammu@584'
    }
});

// GET users listing./
app.post('/contactus', function(req, res, next) {

    const output = `
        <p>
        <h4>${req.body.message}</h4>
        </p>
    `
console.log(req.body)

// setup email data with unicode symbols
let mailOptions = {
    from:'Lakshya It Consulting Users', // sender address
    to:'info@lakshyait.in, snth.ammu@gmail.com', // list of receivers
    subject: req.body.title, // Subject line 'Hello ✔'
    html: output // html body
};
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    else{
        res.render('contact',{info:'Email Sent',pageId:'Contact',pageTitle:'contact'})
   }
    console.log('Message %s sent: %s', info.messageId, info.response);  
            res.render('contact',{info:'Email Sent',pageId:'Contact',pageTitle:'contact'})

});
});


//apply for job

app.post('/apply', function(req, res, next) {
    const output = `
    <h2>You got a New Job Application from the Candidate</h2>
    <p><b>Name</b>:${req.body.name}</p>
    <p><b>Phone Number</b> : ${req.body.phone_number},</p>
    <p><b>Email Id</b> : ${req.body.email_id}</p>
    <p><b>Current Company</b> : ${req.body.current_company},</p>
    <p><b>Current Designation</b> : ${req.body.current_designation},</p>
    <p><b>Total Experience</b> : ${req.body.total_experience},</p>
    <p><b>Current Location</b> : ${req.body.current_location},</p>
    <p><b>Current Salary</b> : ${req.body.current_salary},</p>
    <p><b>Notice Period</b> : ${req.body.notice_period},</p>
    <p><b>Skills</b> : ${req.body.skills},</p>
    <p><b>Current Project</b> : ${req.body.current_project},</p>
    <p><b>Preferred Location</b>: ${req.body.preferred_location},</p>
    `;
    
    console.log(req.body)
    
    // setup email data with unicode symbols
    let mailOptions = {
        from:'Lakshya It Consulting Careers + '<' + req.body.email + '>'', //sender addres
        to:'info@lakshyait.in, snth.ammu@gmail.com, dummymail2468@gmail.com', // list of receivers
        subject: 'Job Application', 
        html: output 
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
            //   res.send('Message sent successfully', info.messageId, info.response);
            MongoClient.connect(dburl, function(err, db) {
                if(err) {  console.log(err); throw err;  }
                data = '';
                db.collection('careers').find().toArray(function(err, docs){
                  if(err)
                    console.log(err);
                  res.render('careers.ejs', {
                                        msg: 'Applied Sucessfully',
                                        data: docs,
                                        pageId: 'careers',
                                        pageTitle: 'Careers',
                                      });
                  db.close();
                });
              });
       }
        console.log('Message %s sent: %s', info.messageId, info.response);  
    });
});
