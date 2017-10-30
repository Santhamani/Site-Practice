var express = require('express')
var router = express.Router();
//var dataFile = require('./data/data.json');

router.get('/services', function(req, res){
        var data = req.app.get('appData');
        var pagePhotos =[];
        var pageSpeakers = data.speakers;
        data.speakers.forEach(function(item) {
                pagePhotos = pagePhotos.concat(item.artwork);
        });

       res.render('services',{
               pageTitle:'Speakers',
               artwork : pagePhotos,
               sravs : pageSpeakers,
               pageId:'speakerList'

       });
});

router.get('/services/:speakerid', function(req, res){
        var data = req.app.get('appData');
        var pagePhotos =[];
        var pageSpeakers = [];

        data.speakers.forEach(function(item) {
                if( item.shortname == req.params.speakerid){
                        pageSpeakers.push(item);
                        pagePhotos = pagePhotos.concat(item.artwork);
                }
                
        });

       res.render('services',{
               pageTitle:'Speakers',
               artwork : pagePhotos,
               sravs : pageSpeakers,
               pageId:'speakerDetails'

       });
});

module.exports = router;