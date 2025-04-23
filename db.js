const {Client} = require('pg');
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
}).catch(function(err){
    console.log(err,"Failed to connect to Database")
})

module.exports = client;