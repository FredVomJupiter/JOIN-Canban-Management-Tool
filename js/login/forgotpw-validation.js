const forgotpwEmail = document.getElementById('forgotpwEmail');


function validateEmail() {
    const emailValue = forgotpwEmail.value.trim();

    if (emailValue === '') {
        showAlert('Please enter your email address');
    } else if (!isValidForgotpwEmail(emailValue)) {
        forgotpwEmail.value = '';
        showAlert('Please enter a valid email address');
    } else {
        openPage('login');
        showAlert(`Please check your inbox for a password reset link.`);
        forgotpwEmail.value = '';
    }
}


const isValidForgotpwEmail = email => {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}