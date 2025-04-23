//original code repurposed from the contributor 'jrichardsz' on StackOverflow
const express = require('express');
const path = require('path');
const app = express();
const pg = require('pg'); //for database work
const db = require('./db.js');
const port = process.env.PORT || 8080;

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
