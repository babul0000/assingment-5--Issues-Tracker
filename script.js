

// login er kaj kora hyche
const loginBtn = document.getElementById('login-btn').addEventListener("click", function() {
    const inputUsername = document.getElementById("input-username")
    console.log(inputUsername.value);

    const inputPassword = document.getElementById("input-password");
    console.log(inputPassword.value);
    
    if(inputUsername.value == "admin" && inputPassword.value == "admin123") {
        // alert("login successfully")
        console.log("succes");
        
        window.location.assign("home.html");
        // window.location.assign("home.html");
    }else{
        alert("login failed")
    }
})


