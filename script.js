//express server code, acting as the midwayy

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
import { client } from './db.mjs';
import { onlineClient } from './db.mjs';

import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { getusername } from './db.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//import { db_connect } from './db.mjs';
import { online_db_connect } from './db.mjs';
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
      const { rows } = await onlineClient.query(query, [username, password]);
  
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
  
  app.post('/getusername', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Use a parameterized query to avoid SQL injection.
      const query = 'SELECT username, password FROM Users WHERE username = $1 AND password = $2';
      const { rows } = await onlineClient.query(query, [username, password]);
  
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

  app.get('/username', async (req, res) => {
    const username = await getusername();
    if (username) {
        res.json({ success: true, username });
    } else {
        res.status(500).json({ success: false, message: "Failed to fetch username" });
    }
});

/*
app.get('/check-db', async (req, res) => {
  const isConnected = await online_db_connect();
  res.json({ success: isConnected });
});
*/

//db connects already so just check to not get the client cant connect twice error
app.get('/check-db', async (req, res) => {
  res.json({ success: onlineClient ? true : false });
});



//test the online database created on render
app.listen(port, function() {
  //db_connect();  //moved to here so express listens to both
  console.log('Online Split is running on ' + port);
});


/*
//console log for testing purposes
app.listen(port, function() {
    db_connect()
    console.log('Split is running on ' + port);
});
*/

//taskkill /f /im node.exe

//mysql database connection
