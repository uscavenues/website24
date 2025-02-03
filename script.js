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

async function submitEmail(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById("email-input");
    const emailSuccess = document.getElementById("email-success");

    const email = emailInput.value.trim();
    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    
    const audienceId = "23b6116543";
    const serverPrefix = "us12"; 

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;
    const data = {
        email_address: email,
        status: "subscribed",
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "709c1f1f0be23af672efec7e2376d57f-us12", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            emailSuccess.style.display = "block"; 
            emailInput.value = ""; 
        } else if (result.title === "Member Exists") {
            alert("This email is already subscribed.");
        } else {
            alert("Subscription failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

document.getElementById("mailchimp-form").addEventListener("submit", submitEmail);