const { Client } = require('pg');
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
const express = require('express');
const app = express();

// --- VARIABLES END ---

function db_connect() {
    client.connect().then(function () {
        console.log("Database Connected Successfully!")

    }).catch(function (err) {
        console.log(err, "Failed to connect to Database")
    })
}

function getusername(){
    client.query("SELECT username FROM Users LIMIT 1", function (err, result) {
        if (err) throw err;
        //console.log(result);
        //okay okay so the result inaan object, the username is 0
        //console.log(result?.rows);
        console.log("result is" + result.rows[0].username);

        if (result?.rows?.length > 0) {
            const username = result.rows[0].username;
            console.log(username);

           /* app.get('/', (req, res) => {
                res.send(username);
            }); */
            return username;
        } else {
            console.log("No users found.");
        }
    });

}

function parafill(){
    db_connect(); //connect to db then do this uwu
    let resy = getusername();
    console.log("para information gotten! It is "+resy);
    return resy;
}

export { parafill};  //export test

db_connect(); //connect to db then do this uwu
getusername(); //get the user ueer function
// route should be "/users"

module.exports = client;

//let ownquery ="SELECT username FROM split LIMIT 1"