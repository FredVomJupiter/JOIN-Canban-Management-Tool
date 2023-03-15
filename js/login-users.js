let users = [];


async function initUsers() {
    // Loading from backend
    setURL('https://www.frederic-rieg.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadLocalStorage('users');
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