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