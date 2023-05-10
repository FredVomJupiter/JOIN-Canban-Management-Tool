const forgotpwForm = document.getElementById('forgotpwForm');
const forgotpwEmail = document.getElementById('forgotpwEmail');


forgotpwForm.addEventListener('submit', e => {
    e.preventDefault();
    validateForgotpwInputs();
});


const isValidForgotpwEmail = email => {
    let result = false;
    users.forEach(user => {
        if (user.email === email) {
            userId = user.id; //Set userId to the user with the current email.
            result = true;
        }
    });
    return result;
}


const validateForgotpwInputs = () => {
    const emailValue = forgotpwEmail.value.trim();

    let correctMail = false;

    // Validate email
    if (emailValue === '') {
        setError(forgotpwEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidForgotpwEmail(emailValue)) {
        setError(forgotpwEmail, 'Wrong Email...');
        correctMail = false;
    } else {
        setSuccess(forgotpwEmail);
        correctMail = true;
    }

    // Send message if all inputs are valid (but no actual mail is sent)
    if (correctMail) {
        sendMessage('mail');
    }
};