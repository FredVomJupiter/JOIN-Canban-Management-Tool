let taskTemplate = new TaskTemplate();
let contactTemplate = new ContactTemplate();

let users;

/**
 * Here it all starts.
 */
async function init() {
    // Loading from backend
    setURL('https://www.frederic-rieg.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadLocalStorage('cards');
    await loadLocalStorage('contacts')
    await loadLocalStorage('categories');
    await loadLocalStorage('users');
    // Updating Board, Summary and Contact pages
    if (cards.length > 0) {
        renderCards();
    }
    greetUser();
    updateCounters();
    renderContactList();
    initNewTask();
}

/**
 * Greeting user if he is loggen in => sesssion value = 1.
 */
function greetUser() {
    if (users && users.length > 0) {
        users.forEach(user => {
            if (user.session === 1) {
                let greeting = document.getElementById('username');
                greeting.innerHTML = "";
                greeting.innerHTML = user.name;
            }
        });
    }
}