let pages = [
    "login",
    "signup",
    "forgotpw",
    "resetpw"
]


function openPage(pageName) {
    hidePages();
    let page = document.getElementById(`${pageName}`);
    page.classList.remove('d-none');
}


function hidePages() {
    pages.forEach(page => {
        let canvas = document.getElementById(`${page}`);
        canvas.classList.add('d-none');
    });
}

/**
 * Dummy function that sends no actual email but only displays message.
 */
function sendMessage(type) {
    if (type == "messageReset") {
        animateMessage('messageReset');
        goToLogin('messageReset');
    } else {
        animateMessage('messageMail');
        goToResetpw('messageMail');
    }
}


function animateMessage(type) {
    let message = document.getElementById(type);
    message.classList.add('animate');
    goToResetpw(type);
}


function goToLogin(type) {
    setTimeout(() => {
        openPage('login');
        let message = document.getElementById(type);
        message.classList.remove('animate');
    }, 3000);
}


function goToResetpw(type) {
    setTimeout(() => {
        openPage('resetpw');
        let message = document.getElementById(type);
        message.classList.remove('animate');
    }, 3000);
}