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
)

const onlineClient = new Client(
    {
        user: "the_splitter",
        host: "dpg-d0jipqbe5dus73cigmhg-a",
        database: "split_online",
        port: "5432",
        password: "khDUNz0oMcqTCwEyTIIgRmO6N1TMWe8u"
    }
)

//const express = require('express');
import { express } from 'express';
const app = express();

// --- VARIABLES END ---

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

}

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

//let ownquery ="SELECT username FROM split LIMIT 1"