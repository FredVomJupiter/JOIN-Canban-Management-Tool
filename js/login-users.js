let users = [];


async function initUsers() {
    // Loading from backend
    setURL('https://www.frederic-rieg.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadLocalStorage('users');
    logoutUsers();
    setRememberedUser();
}


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


function setRememberedUser() {
    if (users.length > 0) {
        users.forEach(user => {
            if (user.remembered === 1) {
                document.getElementById('loginEmail').value = user.email;
                document.getElementById('loginPw').value = user.password;
            }
        });
    }
}


function saveLocalStorage() {
    let users_serialized = JSON.stringify(users);
    backend.setItem("users", users_serialized);
}


async function loadLocalStorage() {
    users_deserialized = JSON.parse(backend.getItem("users"));
    if (users_deserialized != null) {
        users = users_deserialized;
    }
}