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

export async function insertUser(username, password) {
    //this function shld insert a new user into the table post account creation
    const insertQuery = `
      INSERT INTO Users (username, password)
      VALUES ($1, $2)
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

export {defineUsersTable};
export {insertUser};

/*
exports.getusername = async function (){

    return client.query("SELECT username FROM Users LIMIT 1")
    //      function (err, result) {
    //     if (err) throw err;
    //     //console.log(result);
    //     //okay okay so the result inaan object, the username is 0
    //     //console.log(result?.rows);
    //     console.log("result is " + result.rows[0].username);

    //     if (result?.rows?.length > 0) {
    //         const username = result.rows[0].username;
    //         console.log(username);

    //        /* app.get('/', (req, res) => {
    //             res.send(username);
    //         }); */
    //         return username;
    //     } else {
    //         console.log("No users found.");
    //     }
    // });


/*
exports.parafill = function (){
    // db_connect(); //connect to db then do this uwu
    let resy = getusername();
    console.log("para information gotten! It is "+resy);
    return resy;
}

// module.exports = {parafill};  //export test

// db_connect(); //connect to db then do this uwu
// getusername(); //get the user ueer function
// route should be "/users"

// module.exports = client;

//let ownquery ="SELECT username FROM split LIMIT 1" */