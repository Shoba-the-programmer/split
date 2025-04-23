//original code repurposed from the contributor 'jrichardsz' on StackOverflow
var express = require('express');
const path = require('path');
var app = express();
var mysql = require('mysql'); //for database work

var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname+"/splitSiteFiles"));

// set the home page route
app.get('/', function(req, res) {
    res.sendFile('splitHomepage.html', {'root': './splitSiteFiles'});
});

//console log for testing purposes
app.listen(port, function() {
    console.log('Split is running on ' + port);
});

//taskkill /f /im node.exe

//mysql database connection
