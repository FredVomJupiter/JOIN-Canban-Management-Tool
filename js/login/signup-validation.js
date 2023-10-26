const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPw');
const signupPassword2 = document.getElementById('signupConfirm');

/**
 * On submit of signup form, validate inputs.
 */
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    validateSignupInputs();
});


const setError = (element, message) => {
    const errorDisplay = document.getElementById(element);
    errorDisplay.innerText = message;
}


const setSuccess = element => {
    const errorDisplay = document.getElementById(element);
    errorDisplay.innerText = "";
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
    const password2Value = signupPassword2.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPassword = false;

    // Validate name
    if (nameValue === '') {
        setError('signupNameError', 'Name is required');
        correctName = false;
    } else {
        setSuccess('signupNameError');
        correctName = true;
    }

    // Validate email
    if (emailValue === '') {
        setError('signupEmailError', 'Email is required');
        correctMail = false;
    } else if (!isValidSignupEmail(emailValue)) {
        setError('signupEmailError', 'Format should be like foo@bar.com');
        correctMail = false;
    } else {
        setSuccess('signupEmailError');
        correctMail = true;
    }

    // Validate password
    if (passwordValue === '') {
        setError('signupPwError', 'Password is required');
        correctPassword = false;
    } else if (passwordValue != password2Value) {
        setError('signupPwError', 'Passwords do not match');
        correctPassword = false;
    } else {
        setSuccess('signupPwError');
        correctPassword = true;
    }

    // Create new user if all inputs are valid
    if (correctName & correctMail & correctPassword) {
        createNewUser();
    }
};


async function createNewUser() {
    let data = {
        username: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    }
    let response = await fetch(baseUrl + 'register-account/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(error => { console.log(error) });
    let json = await response.json();
    if (response.status != 200) {
        return;
    }
    if (response.status == 200) {
        clearSignupForm();
        openPage('login');
    }
}


function clearSignupForm() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    signupPassword2.value = "";
}