var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'Front-end API' });
});

module.exports = router;
