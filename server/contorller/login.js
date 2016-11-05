var express = require('express'),
    router = express.Router();
var firebase = require('../config/config.js');


/**
 * retrive email id from firebase
 * @cunstructor
 * @param(string)-email
 *
 */
router.post('/', function (req, res) {
    console.log("inside login ");
    console.log(req.body);
    console.log(req.body.email);

    var db = firebase.database();
    var ref = db.ref("EnggPersonalData");
    var postsRef = ref.child("sheetData");



    postsRef.orderByChild("Email_Id").on("value", function (data) {
        // console.log(data.key);
        console.log(data.val());
        var found = false;

        data.forEach(function (data) {
            console.log("The " + data.key + " rating is " + data.val().Email_Id);
            //    console.log(data.Email_Id);
            if (data.val().Email_Id == req.body.email) {
                console.log("The email found");//nareshnarsing38@gmail.com
                console.log(data.val().Name);
                console.log(data.val().Engg_ID);
                found = true;
                var user = data.val().Name;
                var Id = data.val().Engg_ID;
                var userData = {
                    user: user,
                    id: Id
                }
                res.send(userData);

            }

        });
        if (!found) {
            res.send("invalid email");
        }

        console.log("outside the for loop");

    });


});
module.exports = router;
