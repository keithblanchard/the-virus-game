// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));

// listen for requests :)
var listener = app.listen(8081, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
