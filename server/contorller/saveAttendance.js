var express = require('express'),
    router = express.Router();
var firebase = require('../config/config.js');

/**
 * save attendance to the firebase
 *
 */
router.post('/', function(req, res) {
    console.log("inside attendance ");
    console.log(req.body);
    console.log(req.body.EnggId);
    console.log(req.body.date);
    var dateArray = req.body.date.split("-");
    var monthKey = dateArray[0] + "_" + dateArray[2];
    console.log(monthKey);
    console.log(dateArray);
    var db = firebase.database();
    var ref = db.ref("AttendanceData");
    var postsRef = ref.child(req.body.EnggId + "/" + monthKey);
    postsRef.once('value', function(snapshot) {
        postsRef.child(dateArray[1]).set(req.body);
        res.send("data saved succesfully")
    });
});
module.exports = router;
