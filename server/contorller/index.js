var express = require('express'),
    router = express.Router();

router.use('/login',require('./login.js'));
router.use('/retrive',require('./retrive.js'));
router.use('/attendance',require('./attendance.js'));


router.get('/signin', function(req, res) {
    console.log("inside function");
    res.send('Home Screen');
})
module.exports = router;
