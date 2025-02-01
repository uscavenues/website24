window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}
function checkLoggedIn(){
    if(sessionStorage.getItem('loggedIn') == 1){
        document.getElementById("dropdown").style.display="block"
        document.getElementById('loginbutton').innerHTML="LOG OUT"
        console.log("confirmed")
    }
}

function login(){
    if(sessionStorage.getItem('loggedIn') == 1){
        sessionStorage.setItem('loggedIn', 0);
        document.getElementById('loginbutton').innerHTML="MEMBER LOG IN";
        document.getElementById('dropdown').style.display="none";
    }
    else{
        let password = prompt("Enter the password.");
        if (password == "as25*") {
            
            // need to change the nav bar option
            sessionStorage.setItem('loggedIn', 1)
            document.getElementById("dropdown").style.display="block";
            document.getElementById("loginbutton").innerHTML="LOG OUT"
        } 
        else {
            window.alert("Incorrect password. Try again.")
        }
    }
    
}

function showMenu(){
    console.log("showing");
    document.getElementById("options").style.display = "flex";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        document.getElementById("options").style.display = "none";
    }
}

function submitEmail() {
    const emailInput = document.getElementById("email-input");
    const emailSuccess = document.getElementById("email-success");

    if (emailInput.value.includes("@")) {
        emailSuccess.style.display = "block";
        emailInput.value = ""; 
    } else {
        alert("Please enter a valid email address.");
    }
}