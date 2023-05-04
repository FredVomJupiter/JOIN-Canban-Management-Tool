let users = [];


async function initUsers() {
    // Loading from mini backend.
    setURL('https://www.frederic-rieg.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadLocalStorage('users');
    logoutUsers();
    setRememberedUser();
}

/**
 * Loggs out all users on init.
 */
function logoutUsers() {
    if (users.length > 0) {
        users.forEach(user => {
            if (user.session === 1) {
                user.session = 0;
            }
        });
        saveLocalStorage();
    }
}

/**
 * This is a tricky one. If user has checked "remember me" on login he should be able to login
 * again without typing in his credentials. This function checks if there is a user with
 * remebereed = 1 and sets the login form to his credentials.
 */
function setRememberedUser() {
    if (users.length > 0) {
        users.forEach(user => {
            if (user.remembered === 1) {
                document.getElementById('loginEmail').value = user.email;
                document.getElementById('loginPassword').value = 'dummypassword';
            }
        });
    }
}

/**
 * Storing users as JSON in mini backend similar to local storage.
 */
function saveLocalStorage() {
    let users_serialized = JSON.stringify(users);
    backend.setItem("users", users_serialized);
}

/**
 * Loading users as JSON in mini backend similar to local storage.
 */
async function loadLocalStorage() {
    users_deserialized = JSON.parse(backend.getItem("users"));
    if (users_deserialized != null) {
        users = users_deserialized;
    }
}