const baseUrl = 'http://127.0.0.1:8000/';

/**
 * Handling login credentials if user has checked the checkbox to remember his credentials.
 */
function init() {
    let credentials = JSON.parse(localStorage.getItem("user"));
    if (credentials != null) {
        document.getElementById("loginEmail").value = credentials.username;
        document.getElementById("loginPw").value = credentials.password;
        document.getElementById("rememberUser").checked = true;
    } else {
        document.getElementById("rememberUser").checked = false;
    }
}


async function loginWithGuestAccount() {
    document.getElementById("loginEmail").value = "guest";
    document.getElementById("loginPw").value = "MNM&9Ah\"D3!Q4Hv";
    await startHttpRequest();
}


/**
 * Standard Login with Username and Password.
 */
async function loginWithUsernameAndPassword() {
    checkUserInput() ? await startHttpRequest() : null;
}

/**
 * Frontend validation if user has provided any input at all.
 * @returns true if user has entered email and password.
 */
function checkUserInput() {
    const email = document.getElementById("loginEmail");
    const password = document.getElementById('loginPw');
    if (email.value == "" || password.value == "") {
        document.getElementById('emailError').innerHTML = "Please enter your email or username.";
        document.getElementById('passwordError').innerHTML = "Please enter your password.";
        return false;
    }
    return true;
}

/**
 * Sends POST request with user credentials to Django backend for validation.
 * @returns a token if user credentials are valid.
 */
async function startHttpRequest() {
    let email = document.getElementById("loginEmail");
    let password = document.getElementById('loginPw');
    let data = {
        username: email.value,
        password: password.value
    }
    let response = await fetch(baseUrl + 'login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(error => { console.log(error) });
    let json = await response.json();
    if (response.status != 200) {
        handleErrors(data);
        return;
    }
    removeErrors();
    rememberUser();
    localStorage.setItem('username', JSON.stringify(email.value));
    window.open('./dashboard.html', '_self'); // Redirect to Dashboard
}

/**
 * Removes old error messages from the login form.
 */
function removeErrors() {
    document.getElementById('emailError').innerHTML = "";
    document.getElementById('passwordError').innerHTML = "";
}

/**
 * Writes error messages to the login form based on the response from the server.
 * @param {*} response a response object from the server.
 */
function handleErrors(data) {
    if (data.password) {
        document.getElementById('passwordError').innerHTML = data.password;
    }
    if (data.username) {
        document.getElementById('emailError').innerHTML = data.username;
    }
    if (data.non_field_errors) {
        document.getElementById('emailError').innerHTML = data.non_field_errors;
        document.getElementById('passwordError').innerHTML = data.non_field_errors;
    }
}


/**
 * Checks if user has marked the checkbox to remember his login credentials.
 * Credentials are stored in local storage.
 */
function rememberUser() {
    let remember = document.getElementById("rememberUser");
    if (remember.checked) {
        let credentials = {
            username: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPw").value
        }
        localStorage.setItem("user", JSON.stringify(credentials));
    } else {
        localStorage.removeItem("user");
    }
}