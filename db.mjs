import dotenv from "dotenv";
dotenv.config();

//database access file

//const { Client } = require('pg');
//import { Client } from '..node_modules/pg';
import { Client } from 'pg';


let un = null;

const client = new Client(
    {
        user: "postgres",
        host: "localhost",
        database: "split",
        port: "5432",
        password: "root"
    }
) // not gonna be used online so wont really matter if it stays?

const onlineClient = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD
}); //security , no checking for u :P


//const express = require('express');
//import express from 'express';
//const app = express();

//express uneeded in databse file

// --- VARIABLES END ---

/*
export function online_db_connect() {
    onlineClient.connect().then(function () {
        console.log("Database Connected Successfully!")

    }).catch(function (err) {
        console.log(err, "Failed to connect to Database")
    })
}
*/
/*
export async function online_db_connect() {
    try {
        await onlineClient.connect();
        console.log("Database Connected Successfully!");
        return true; // Indicates a successful connection
    } catch (error) {
        console.error("Failed to connect to Database:", error);
        return false; // Indicates failure
    }
}
*/

//ah so only do it once to continue
(async () => {
    try {
        await onlineClient.connect();
        console.log("✅ Database Connected Successfully!");
    } catch (error) {
        console.error("❌ Failed to connect to Database:", error);
    }
})(); //im keeping the emojis >:P, let me have a little whimsy in this exhausting coding + bug fixing period. its been like 7 hours straight

// Remove the connect() call from the function
export async function online_db_connect() {
    return onlineClient ? true : false;
}

/*
export function db_connect() {
    client.connect().then(function () {
        console.log("Database Connected Successfully!")

    }).catch(function (err) {
        console.log(err, "Failed to connect to Database")
})
}
*/

/*
exports.online_db_connect = function() {
  onlineClient.connect().then(function () {
      console.log("Database Connected Successfully!")

  }).catch(function (err) {
      console.log(err, "Failed to connect to Database")
  })
}
  

exports.db_connect = function() {
  client.connect().then(function () {
      console.log("Database Connected Successfully!")

  }).catch(function (err) {
      console.log(err, "Failed to connect to Database")
  })
}
*/

/*
export async function getusername() {
    return client.query("SELECT username FROM Users LIMIT 1")
}
    */

export async function getusername() {
    try {
        const result = await onlineClient.query("SELECT username FROM Users LIMIT 1");
        return result.rows[0].username; // to get just the username!
    } catch (error) {
        console.error("Error fetching username:", error);
        return null;
    }
}

export async function getCurrentUsersInformation(){

}

/*
export function parafill() {
    let resy = getusername();
    console.log("para information gotten! It is "+resy);
    return resy;
    //return client.query("SELECT username FROM Users LIMIT 1")
}
    */

export async function parafill() {
    let resy = await getusername(); // db accessing is aysnc!!! aaaaaaaa
    console.log("Para information gotten! It is", resy);
    return resy;
}

export { client };
export { onlineClient };

//to begin the website and login, the user table must be created
export async function defineUsersTable() {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    try {
        await onlineClient.query(createUsersTableQuery);
        console.log("Users table created (or already exists).");
    } catch (error) {
        console.error("Error creating Users table:", error);
    }
}

//plus the story table
export async function defineStoryTable() {
    const createStoryTableQuery = `
      CREATE TABLE IF NOT EXISTS Stories (
        storyID SERIAL PRIMARY KEY,
		user_id integer NOT NULL,
		title VARCHAR(90) NOT NULL,
		story_location VARCHAR(60),
		story_description VARCHAR,
		tags TEXT[],
		status VARCHAR,
		FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    );
    `;
    try {
        await onlineClient.query(createStoryTableQuery);
        console.log("Story created (or already exists).");
    } catch (error) {
        console.error("Error creating Users table:", error);
    }
}


export async function insertUser(username, password) {
    //this function shld insert a new user into the table post account creation
    const insertQuery = `
      INSERT INTO Users (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username)
      DO NOTHING
      RETURNING *;
    `;
    try {
        const result = await onlineClient.query(insertQuery, [username, password]);
        console.log("Inserted user:", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting user:", error);
        return null;
    }
}

export async function getUserInfo() {
    //function to get all users , to be shown in the login database and move to the dev tools screen later
    //const getallusersquery = "SELECT * FROM Users" ; -redundant
    try {
        const result = await onlineClient.query("SELECT * FROM Users");
        console.log("All users acquired");
        return result.rows;
    } catch (error) {
        //if there's an error getting the user info tell it
        console.error("Error getting user table information", error);
        return null;
    }

}

export async function getcurrentuser(id){
    try {
        const query = 'SELECT user_id , username FROM Users WHERE user_id = $1';
        const result  = await onlineClient.query(query, [id]);
        return result.rows;
    } catch (error) {
        //if there's an error getting the user info tell it
        console.error("Error getting user table information", error);
        return null;
    }
}

export async function check_login_entry(username,password) {
    try {
        const query = 'SELECT user_id,username, password FROM Users WHERE username = $1 AND password = $2';
        const result = await onlineClient.query(query, [username, password]);
        console.log("matching login found");

        return result.rows; // Returns an array of rows that match the criteria
    } catch (err) {
        console.error('Error checking login:', err);
        // Rethrow the error so the route can catch it if needed
        throw err;
    }
}

export async function doesUNexist(unny) {
    //function to check if the username exists in the system, used for creating accountz
    const doesUNexist = "SELECT username from Users WHERE username=$1";
    try {
        const result = await onlineClient.query(doesUNexist, [unny]);
        console.log("username searched for");
        return result.rows;
    } catch (error) { }
}

export async function dev_queries(dev_query) {
    try {
        const result = await onlineClient.query(dev_query);
        console.log("query executed");
    } catch (error) {
        console.error("Error occured while exectuing dev query:", error);
        return null;
    }
}

export async function savenewstory(storytitle,storytext){
    try {
        letinsertquery = "INSERT INTO Stories (user_id,title,story_text), VALUES (1,$1,$2)";
        const result = await onlineClient.query(query, [storytitle,storytext]);
        console.log("query executed");
    } catch (error) {
        console.error("Error occured while exectuing dev query:", error);
        return null;
    }
}

export async function callstories(){
    try {
       let allstories = "SELECT * FROM Stories";
        const result = await onlineClient.query(allstories);
        console.log("query executed");
    } catch (error) {
        console.error("Error occured while exectuing dev query:", error);
        return null;
    }
}