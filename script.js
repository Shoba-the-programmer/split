//original code repurposed from the contributor 'jrichardsz' on StackOverflow
//const express = require('express');
import express from 'express';
//const path = require('path');
import path from 'node:path';
const app = express();
//const pg = require('pg'); //for database work
import pg from 'pg';
//const {db_connect} = require('./splitSiteFiles/db.mjs');
//const {online_db_connect} = require('./splitSiteFiles/db.mjs');
//const userRoute = require("./routes/user.route.js")

import { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import { db_connect } from './splitSiteFiles/db.mjs';
import { online_db_connect } from './splitSiteFiles/db.mjs';
import userRoute from './routes/user.route.js'

const port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname+"/splitSiteFiles"));

// set the home page route
app.get('/',
    function(req, res) {
    res.sendFile('splitHomepage.html', {'root': './splitSiteFiles'});
});

app.use(userRoute);

// Endpoint to check login credentials
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Use a parameterized query to avoid SQL injection.
      const query = 'SELECT username, password FROM Users WHERE username = $1 AND password = $2';
      const { rows } = await client.query(query, [username, password]);
  
      if (rows.length > 0) {
        // Return the matching user record
        res.json({ success: true, user: rows[0] });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      console.error('Error checking login:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//test the online database created on render
app.listen(port, function() {
  online_db_connect()
  console.log('Online Split is running on ' + port);
});


//console log for testing purposes
app.listen(port, function() {
    db_connect()
    console.log('Split is running on ' + port);
});

//taskkill /f /im node.exe

//mysql database connection
