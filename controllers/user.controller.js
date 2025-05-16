const {getusername} = require("../splitSiteFiles/db")
exports.createUser =  function (req, res) {
    
    res.status(201).json({
        success: true,
        message: "User created",
        // data: {username: "John doe"}
    })
}

exports.getUsers = async function (req, res) {
    const result = await getusername()
    console.log( result.rows[0].username, "usernames")

    res.status(200).json({
        success: true,
        message: "User retrieved",
        data: result.rows[0]
    })
}

exports.checklogins = async function login(event){
    event.preventDefault();
    const Username = document.getElementById("login_username").value;
    const Password = document.getElementById("login_password").value;
    const resultElement = document.getElementById("alert").value;

    try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Username, Password })
        });
        const data = await response.json();

        if (data.success) {
          // Display the found matching username and password in the <p> element.
          resultElement.innerHTML = `<strong>Login Successful!</strong><br>
                                     Username: ${data.user.username}<br>
                                     Password: ${data.user.password}`;
        } else {
          resultElement.textContent = "Login Failed. Please try again.";
        }
      } catch (error) {
        console.error('Error:', error);
        resultElement.textContent = "An error occurred. Please try again later.";
      }
    
}