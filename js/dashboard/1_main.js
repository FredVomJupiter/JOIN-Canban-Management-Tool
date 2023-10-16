let taskTemplate = new TaskTemplate();
let contactTemplate = new ContactTemplate();

/**
 * Here it all starts.
 */
async function init() {
    if (checkToken()) {
        // Updating Board, Summary and Contact pages.
        if (cards.length > 0) {
            renderCards();
        }
        greetUser();
        updateCounters();
        renderContactList();
        initNewTask();
    } else {
        // Redirect to Login page if no token is available.
        window.location.href = "login.html";
    }
}

/**
 * Simple check if a token is available.
 */
function checkToken() {
    return document.cookie == "" ? false : true;
}

/**
 * Writes greeting with username from localStorage.
 */
function greetUser() {
    let user = JSON.parse(localStorage.getItem('username'));
    let greeting = document.getElementById('username');
    greeting.innerHTML = "";
    greeting.innerHTML = user;
}