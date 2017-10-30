

var express = require('express');
var router = express.Router();

router.get('/aboutus', function(req, res){
        var data = req.app.get('appData');
        var pagePhotos =[];
        var pageSpeakers = data.speakers;

        data.speakers.forEach(function(item) {
                pagePhotos = pagePhotos.concat(item.artwork);
        });

       res.render('aboutus',{
               pageTitle:'Pvt Ltd',
               artwork : pagePhotos,
               pageId:'lakshya',
               sravs: pageSpeakers
       });
});

module.exports = router;