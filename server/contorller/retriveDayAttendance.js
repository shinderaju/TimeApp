var express = require('express'),
    router = express.Router();
var firebase = require('../config/config.js');


/**
 * retrive month attendance from firebase
 *
 */
router.post('/', function (req, res) {
    console.log("inside retrive ");
    console.log(req.body);
    console.log(req.body.EnggId);
    console.log(req.body.date);
    var dateArray = req.body.date.split("-");
    var monthKey = dateArray[0] + "_" + dateArray[2];
    console.log(monthKey);
    console.log(dateArray);
    var db = firebase.database();
    var ref = db.ref("AttendanceData");
    var postsRef = ref.child(req.body.EnggId + "/" + monthKey + "/" + dateArray[1]);
    postsRef.once('value', function (snapshot) {
        console.log(snapshot.val());
        var d = snapshot.val();
        var userData = {
                    attendance: d
                }
         res.send(userData);
    }); //end of postsRef.once
});
module.exports = router;
