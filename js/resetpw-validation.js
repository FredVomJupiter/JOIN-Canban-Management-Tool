const resetpwForm = document.getElementById('resetpwForm');
const resetpwP1 = document.getElementById('resetpwP1');
const resetpwP2 = document.getElementById('resetpwP2');


resetpwForm.addEventListener('submit', e => {
    e.preventDefault();
    validateResetpwInputs();
});

const isValidPassword = (p1, p2) => {
    return p1 === p2;
}

const validateResetpwInputs = () => {
    const passwordValue1 = resetpwP1.value.trim();
    const passwordValue2 = resetpwP2.value.trim();

    let matchingPassword = false;


    if (passwordValue1 === '' || passwordValue2 === '') {
        setError(resetpwP1, 'Password is required');
        setError(resetpwP2, 'Password is required');
        matchingPassword = false;
    } else if (!isValidPassword(passwordValue1, passwordValue2)) {
        setError(resetpwP1, 'Passwords are not matching...');
        setError(resetpwP2, 'Passwords are not matching...');
        matchingPassword = false;
    } else {
        setSuccess(resetpwP1);
        setSuccess(resetpwP2);
        matchingPassword = true;
    }

    if (matchingPassword) {
        setNewPassword(passwordValue1);
        sendMessage('messageReset');
    }
};


function setNewPassword(passwordValue1) {
    users.forEach(user => {
        if (user.id === userId) {
            user.password = passwordValue1;
        }
    });
    saveLocalStorage('users');
}