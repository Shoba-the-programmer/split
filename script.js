//express server code, acting as the midwayy

//original code repurposed from the contributor 'jrichardsz' on StackOverflow
//const express = require('express');
import express from 'express';
import session from 'express-session';
//const path = require('path');
import path from 'node:path';
//import { fileURLToPath } from 'url';
const app = express();
import { defineUsersTable, insertUser , getUserInfo, defineStoryTable, getcurrentuser, dev_queries} from './db.mjs';
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
import { get } from 'node:http';

const port = process.env.PORT || 8080;

defineUsersTable(); //on server startup, call the create table function from the db file
defineStoryTable(); //same for the story table
//quick dev queries whilst the dev tool section disagrees with me
//dev_queries("DELETE FROM Users WHERE username = 'nerdalert'");
//dev_queries("ALTER TABLE Users ADD CONSTRAINT unique_username UNIQUE(username);");
dev_queries("ALTER TABLE Users ADD COLUMN story_text TEXT");

//user sessions
app.use(session({
  secret: 'your-very-secret-string',  // replace this with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure: true in production with HTTPS
}));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname+"/splitSiteFiles"));

// set the home page route
app.get('/',
    function(req, res) {
    res.sendFile('splitHomepage.html', {'root': './splitSiteFiles'});
});

app.use(userRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to check login credentials
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      //const { username, password } = req.body;  // Now req.body will be defined
    /*  if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
      } */
      const user = await check_login_entry(username, password);
      if (user && user.length > 0) {
        // Successful login: return the first matching record
        // + make them the active user and goto the login_page
        req.session.activeUser = user[0].user_id;
        console.log("Active user set:", req.session.activeUser);

        res.json({ success: true, user: user[0] , message: "Welcome" , activeuser: req.session.activeUser});
        
      } else {
        res.json({ success: false, message: "Invalid credentials." });
      }
    } catch (err) {
      console.error("Error in /login:", err);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  });

  app.get('/logout', (req, res) => {
    
    // Destroy the entire session on logout to be safe
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ success: false, message: "Logout failed." });
      }
      res.json({ success: true, message: "Logged out successfully." });
    });
  });

  app.get('/active-user', (req, res) => {
    if (req.session.activeUser) {
      res.json({ success: true, user: req.session.activeUser });
    } else {
      res.json({ success: false, user: null });
    }
  });

app.post('/create-user', async (req, res) => {
  try {
    const { username, password } = req.body;  // Now req.body will be defined
  /*  if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required." });
    } */
    const user = await insertUser(username, password);
    res.json({ success: user ? true : false, user });
  } catch (err) {
    console.error("Error in /create-user:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
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

  app.post('/getusernamebyid', async (req, res) => {
    const {currentID} = req.body;
    const curr_user = await getcurrentuser(currentID);

    if (curr_user && curr_user.length >0){
      //if a user row was returned, use it
      //const current_name = curr_user[0].username;
      res.json({ success: true, user: curr_user[0].username });
    } else {
      res.json({ success: false, message: "User not found" });
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

app.get('/checkusername', async (req,res) => {
  //endpoint to check for matching username
  const { username } = req.body;
  const username_check =  await doesUNexist(unny);

});

app.get('/allusers', async (req,res) => {
  const userdata  = await getUserInfo();
  if (userdata && userdata.length > 0) {
    // Return the matching user record
    //to get multiple rows check if the db query is successful AND if multiple rows exist
    res.json({ success: true, user: userdata });
  } else {
    res.json({ success: false, message: "No users found." });
  }
});

/*
app.get('/check-db', async (req, res) => {
  const isConnected = await online_db_connect();
  res.json({ success: isConnected });
});
*/

app.get('/curr_userstories', async (req, res) => {
  try {
    // Query the story table for the story id, title, and status
    const result = await onlineClient.query("SELECT storyid, title, status FROM Stories WHERE user_id = $1");
    res.json({ success: true, stories: result.rows });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


//db connects already so just check to not get the client cant connect twice error
app.get('/check-db', async (req, res) => {
  res.json({ success: onlineClient ? true : false });
});



//test the online database created on render
app.listen(port, function() {
  //db_connect();  //moved to here so express listens to both
  console.log('Online Split Server is running on ' + port);
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
