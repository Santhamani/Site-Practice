

var express = require('express');
var router = express.Router();

router.get('/technologies', function(req, res) {

res.render('technologies', {
    pageTitle:'Technologies',
    pageId:'technologies'
});
});
module.exports = router;