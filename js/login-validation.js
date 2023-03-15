const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPw');


let userId;


loginForm.addEventListener('submit', e => {
    e.preventDefault();
    validateLoginInputs();
});


const setLoginError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

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

const isValidLoginPassword = password => {
    let result = false;
    // User must provide correct email and password to get valid password
    users.forEach(user => {
        if (user.password === password && user.id === userId) {
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

    if (passwordValue === '') {
        setLoginError(loginPassword, 'Password is required');
        correctPassword = false;
    } else if (!isValidLoginPassword(passwordValue)) {
        setLoginError(loginPassword, 'Wrong password...');
        correctPassword = false;
    } else {
        setLoginSuccess(loginPassword);
        correctPassword = true;
    }

    if (correctMail & correctPassword) {
        rememberUser();
        loginUser();
    }
};


function rememberUser() {
    if (document.getElementById('rememberUser').checked) {
        users.forEach(user => {
            if (user.id === userId) {
                user.remembered = 1;
            }
        });
        
    } else {
        users.forEach(user => {
            user.remembered = 0;
        });
    }
}


function loginUser() {
    users.forEach(user => {
        if (user.id === userId) {
            user.session = 1; 
        }
    });
    saveLocalStorage();
    setTimeout(function() {
        openDashboard();
    }, 2000);
}