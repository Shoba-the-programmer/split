//this file holds navigation and login functions
var homeUrl = "splitHomepage.html";
var loginUrl = "splitLoginPage.html";
var publishUrl = "splitPublishPage.html";
var writerPortalUrl = "splitWritersPage.html";
var chapterWritingUrl = "bookchapterpage.html";
var adminUrl = "devtools.html";
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

    /*  
    */
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

function create_account_check(){
    let un = "";
    let pass1 = "";
    let pass2 = "" ;

}

function toggle_dt_password(){
    let dtPassArea = document.getElementsByClassName("dt_password_entry")[0];
    if (dtPassArea.style.display == "none"){
        dtPassArea.style.display = "block";
    } else {
        dtPassArea.value = "";
        dtPassArea.style.display = "none";
    }

}

let pass="r00t";

function check_dtpass(){
    let dt_input = document.getElementsByClassName("dt_pass_entry");
    if (dt_input.value===pass){
        //clear the password and close entry box
        dt_input.value = "";
        toggle_dt_password();
        //goto dev tools page
        gotoWebpage(adminUrl);
    } else {
        alert("wrong");
        dt_input.value = "";
        toggle_dt_password();

    }
}
