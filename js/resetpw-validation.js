const resetpwForm = document.getElementById('resetpwForm');
const resetpwP1 = document.getElementById('resetpwP1');
const resetpwP2 = document.getElementById('resetpwP2');


resetpwForm.addEventListener('submit', e => {
    e.preventDefault();
    validateResetpwInputs();
});

/**
 * Strict equality comparison of two strings (same value and same type).
 * @param {*} p1 as string.
 * @param {*} p2 as string.
 * @returns true or false.
 */
const isValidPassword = (p1, p2) => {
    return p1 === p2;
}


const validateResetpwInputs = () => {
    const passwordValue1 = resetpwP1.value.trim();
    const passwordValue2 = resetpwP2.value.trim();

    let matchingPassword = false;

    // Validate passwords
    if (passwordValue1 === '' || passwordValue2 === '') {
        setError(resetpwP1, 'Password is required');
        setError(resetpwP2, 'Password is required');
        matchingPassword = false;
    } else if (!isValidPassword(passwordValue1, passwordValue2)) {
        setError(resetpwP1, 'Passwords are not matching...');
        setError(resetpwP2, 'Passwords are not matching...');
        matchingPassword = false;
    } else if (isValidPassword(passwordValue1, passwordValue2)) {
        setSuccess(resetpwP1);
        setSuccess(resetpwP2);
        matchingPassword = true;
    }

    // If all inputs are correct, set new password and send message to user.
    if (matchingPassword) {
        setNewPassword(passwordValue1);
        sendMessage('messageReset');
    }
};

/**
 * Searches for the user with the same id as the current user and sets the new hashed password from inputfield 1.
 * @param {*} passwordValue1 as string.
 */
function setNewPassword(passwordValue1) {
    users.forEach(user => {
        if (user.id === userId) {
            user.password = hashInput(passwordValue1); // hashInput() is defined in js/login-validation.js
        }
    });
    saveLocalStorage('users');
}