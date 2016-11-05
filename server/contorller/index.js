var express = require('express'),
    router = express.Router();

router.use('/login',require('./login.js'));
router.use('/retriveMonthAttendance',require('./retriveMonthAttendance.js'));
router.use('/saveAttendance',require('./saveAttendance.js'));
router.use('/retriveDayAttendance',require('./retriveDayAttendance.js'));


router.get('/signin', function(req, res) {
    console.log("inside function");
    res.send('Home Screen');
})
module.exports = router;
