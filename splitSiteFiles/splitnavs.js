var homeUrl = "splitHomepage.html";
var loginUrl = "splitLoginPage.html";
var publishUrl = "splitPublishPage.html";
var writerPortalUrl = "splitWritersPage.html";
var chapterWritingUrl = "bookchapterpage.html";

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

function checklogininfo(un,pass){
    //compare the login information to the data stored in the database
}

function check_login_entry(){
    let un = document.getElementById('login_username');
    let pass = document.getElementById('login_password');
    var badDataAlert = document.getElementById('alert');

    if (is_empty(un) == true || is_empty(pass) == true){
        //if either is empty then alert that it's empty
        badDataAlert.innerText = "You haven't entered a username and password!";
    }

}