var path = require('path');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '../client')));
app.use(require('./contorller/index.js'));

/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
    app.listen(app.get('port'), app.get('host'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
