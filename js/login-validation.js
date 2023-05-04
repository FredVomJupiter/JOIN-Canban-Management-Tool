const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPw');


let userId; // For remembering user and user session when loggin in


loginForm.addEventListener('submit', e => {
    e.preventDefault();
    validateLoginInputs();
});


/**
 * Sets an error message and class to the input element.
 * @param {*} element as HTML element.
 * @param {*} message as string.
 */
const setLoginError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}


/**
 * Sets a success class to the input element.
 * @param {*} element as HTML element.
 */
const setLoginSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


const isValidLoginEmail = email => {
    let result = false;
    users.forEach(user => {
        if (user.email === email) {
            userId = user.id; //Set userId to the user with the current email.
            result = true;
        }
    });
    return result;
}

/**
 * Compares the hashed password from user input with the hashed password
 * from the user object from database / local storage.
 * @param {*} password as string from userinput.
 * @returns true if password is valid, false if not.
 */
const isValidLoginPassword = password => {
    let result = false;
    // User must provide correct email and password to get valid password
    users.forEach(user => {
        if ((user.password === hashInput(password) && user.id === userId)
            || (password === "dummypassword" && user.id === userId)) { // Highly insecure, but for demonstration purposes only => otherwise an entire cookie session system would be needed.
            result = true;
        }
    });
    return result;
}


const validateLoginInputs = () => {
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    let correctMail = false;
    let correctPassword = false;

    // Email validation
    if (emailValue === '') {
        setLoginError(loginEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidLoginEmail(emailValue)) {
        setLoginError(loginEmail, 'Wrong Email...');
        correctMail = false;
    } else {
        setLoginSuccess(loginEmail);
        correctMail = true;
    }

    // Password validation
    if (passwordValue === '') {
        setLoginError(loginPassword, 'Password is required');
        correctPassword = false;
    } else if (!isValidLoginPassword(passwordValue)) {
        setLoginError(loginPassword, 'Wrong password...');
        correctPassword = false;
    } else if (isValidLoginPassword(passwordValue)) {
        setLoginSuccess(loginPassword);
        correctPassword = true;
    }

    // Login user if email and password are correct.
    if (correctMail & correctPassword) {
        rememberUser();
        loginUser();
    }
};

/**
 * Hashes a string with SHA256 and salt. Salt is for demonstration purposes only, because
 * in this case it does not add any security to the hashing (as it can be seen in the browser's dev tools).
 * @param {*} password as string from user input.
 * @returns hashed string of password to compare.
 */
function hashInput(password) {
    let salt = "ThisIsSoSalty!";
    let water = CryptoJS.algo.SHA256.create();
    water.update(password);
    water.update(CryptoJS.SHA256(salt));
    hash = water.finalize().toString(CryptoJS.enc.hex);
    return hash.toString();
}

/**
 * Saves the user's checkmarkt "rember login" to local storage.
 */
function rememberUser() {
    if (document.getElementById('rememberUser').checked) {
        rememberTrue();
    } else {
        rememberFalse();
    }
}


function rememberTrue() {
    users.forEach(user => {
        if (user.id === userId) {
            user.remembered = 1;
        }
    });
}


function rememberFalse() {
    users.forEach(user => {
        user.remembered = 0;
    });
}


function loginUser() {
    startUserSession(); // Set user session to 1.
    saveLocalStorage(); // Timeout needed for saving data in mini backend before opening dashboard too early.
    setTimeout(function () {
        openDashboard();
    }, 2000);
}

/**
 * Sets the user session to 1 when successfully logged in.
 * This is used for greeting the user on the dashboard.
 */
function startUserSession() {
    users.forEach(user => {
        if (user.id === userId) {
            user.session = 1;
        }
    });
}