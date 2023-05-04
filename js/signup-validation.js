const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPw');

/**
 * On submit of signup form, validate inputs.
 */
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    validateSignupInputs();
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}


const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

/**
 * Regular expression to validate email format with extra strict rules => minimum 2 characters after @, no numbers or special characters allowed in domain.
 * @param {*} email as string.
 * @returns true or false.
 */
const isValidSignupEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateSignupInputs = () => {
    const nameValue = signupName.value.trim();
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPassword = false;

    // Validate name
    if (nameValue === '') {
        setError(signupName, 'Name is required');
        correctName = false;
    } else {
        setSuccess(signupName);
        correctName = true;
    }

    // Validate email
    if (emailValue === '') {
        setError(signupEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidSignupEmail(emailValue)) {
        setError(signupEmail, 'Only valid email formats allowed with @ and ending ".xy(z)"');
        correctMail = false;
    } else {
        setSuccess(signupEmail);
        correctMail = true;
    }

    // Validate password
    if (passwordValue === '') {
        setError(signupPassword, 'Password is required');
        correctPassword = false;
    } else {
        setSuccess(signupPassword);
        correctPassword = true;
    }

    // Create new user if all inputs are valid
    if (correctName & correctMail & correctPassword) {
        createNewUser(nameValue, emailValue, hashInput(passwordValue));
    }
};


function createNewUser(nameValue, emailValue, passwordValue) {
    users.push(new User(nameValue, emailValue, passwordValue, 0)); // 0 = not logged in, 1 = logged in
    saveLocalStorage();
    openPage('login');
}