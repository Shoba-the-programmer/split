//this file holds navigation and login functions
var homeUrl = "splitHomepage.html";
var loginUrl = "splitLoginPage.html";
var publishUrl = "splitPublishPage.html";
var writerPortalUrl = "splitWritersPage.html";
var chapterWritingUrl = "bookchapterpage.html";

var test_username = "sigma";
var test_password = "zhetaXDC"

function gotoWebpage(page){
    window.location.href = page;
}

function trigger_CA_overlay(){
    //calls or removes the ca overlay
    //let view = document.getElementById('create_account_overlay').style.display;
    var ca_overlay = document.getElementById('create_account_overlay');
    if (ca_overlay.style.display === 'none' || ca_overlay.style.display ===""){
        ca_overlay.style.display = 'flex';
    } else {
        ca_overlay.style.display = 'none';
    }
}

function is_empty(thing){
    if(thing.value.trim() === null || thing.value.trim() === ""){
        return true;
    }
}

function doesUserExist(un,pass){
    //compare the login information to the data stored in the database
    return false;
}

function check_login_entry(){
    let un = document.getElementById('login_username');
    let pass = document.getElementById('login_password');
    var badDataAlert = document.getElementById('alert');

    if (is_empty(un) == true || is_empty(pass) == true){
        //if either is empty then alert that it's empty
        badDataAlert.innerText = "You haven't entered a username and password!";
        //break
    }
    //then check against user info in database 
    else if(!doesUserExist(un,pass)){
        //if its false then the user doesnt exist or there was an error
        badDataAlert.innerText ="";
    } 
}