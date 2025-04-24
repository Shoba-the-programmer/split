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
    client.query("SELECT username FROM users LIMIT 1", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        //okay okay so the result inaan object, the username is 0
        
        const username = result[0].username;
                app.get('/', (req, res) => {
                    res.send(username);
                });

      });
}).catch(function(err){
    console.log(err,"Failed to connect to Database")
})

module.exports = client;

let ownquery ="SELECT username FROM split LIMIT 1"