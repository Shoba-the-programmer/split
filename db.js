const {Client} = require('pg');
let un = null;
const client = new Client(
    {
        user:"postgres",
        host:"localhost",
        database:"split",
        port:"5432",
        password:"root"
    }
)
client.connect().then(function(){
    console.log("Database Connected Successfully!")
    client.query("SELECT username FROM split LIMIT 1", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        un = result;
      });
}).catch(function(err){
    console.log(err,"Failed to connect to Database")
})

module.exports = client;

let ownquery ="SELECT username FROM split LIMIT 1"