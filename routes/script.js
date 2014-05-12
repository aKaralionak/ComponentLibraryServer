var express = require('express'),
    bundle = require('../controllers/bundle'),
    router = express.Router();

router.get('/:components?', function (req, res) {
    bundle.scripts(res, req.app.get('baseConstants'), req.param('components'));
});
module.exports = router;