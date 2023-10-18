let taskTemplate = new TaskTemplate();
let contactTemplate = new ContactTemplate();

/**
 * Here it all starts.
 */
async function init() {
    if (checkToken()) {
        greetUser();
        updateCounters();
        renderCards();
        initNewTask();
    } else {
        window.open('./login.html', '_self'); // Redirect to Login page if no token is available.
    }
}

/**
 * Simple check if a token is available to prevent manual access via url.
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