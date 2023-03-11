let pages = [
    "login",
    "signup",
    "forgotpw",
    "resetpw"
]


function openDashboard() {
    window.open('./dashboard.html', '_self');
}


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
 * Dummy function that needs to be modified, to handle user-input and send actual email.
 */
function sendMessage(type) {
    if (type == "messageReset") {
        let message = document.getElementById('messageReset');
        message.classList.add('animate');
        setTimeout(() => {
            openPage('login');
            message.classList.remove('animate');
        }, 3000);
    } else {
        let message = document.getElementById('messageMail');
        message.classList.add('animate');
        setTimeout(() => {
            openPage('resetpw');
            message.classList.remove('animate');
        }, 3000);
    }
}