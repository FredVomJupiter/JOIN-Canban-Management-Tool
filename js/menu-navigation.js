let links = {
    login: "login.html",
    summary: "dashboard.html",
}

let pages = [
    "summary",
    "board",
    "addtask",
    "contacts",
    "legal",
    "help"
]

let menus = [
    "menu-summary",
    "menu-board",
    "menu-addtask",
    "menu-contacts",
    "menu-legal",
]


function openSignout() {
    let signout = document.getElementById('signout');
    if (signout.classList.contains('d-none')) {
        signout.classList.remove('d-none');
    } else {
        signout.classList.add('d-none');
    }
}


function openLogin() {
    window.open('./login.html', '_self');
}


function openPage(pageName) {
    renderPageSpecificContent(pageName);
    hideAllPages(); // Needs to be called before showPage()!!!
    removeDarkMenu();
    showOnlySelectedPage(pageName);
    addMenuSelectionForPage(pageName);
}


function renderPageSpecificContent(pageName) {
    pageName === 'summary' ? updateCounters() : "";
    pageName === 'contacts' ? renderContactList(): "";
    pageName === 'board' ? renderCards() : "";
}


function hideAllPages() {
    pages.forEach(page => {
        let canvas = document.getElementById(`${page}`);
        canvas.classList.add('d-none');
    });
}


function removeDarkMenu() {
    menus.forEach(menu => {
        let menupoint = document.getElementById(`${menu}`);
        if (menupoint.classList.contains('sidebar-menu-option-dark')) {
            menupoint.classList.remove('sidebar-menu-option-dark');
            menupoint.classList.add('sidebar-menu-option-light');
        }
    });
}


function showOnlySelectedPage(pageName) {
    let page = document.getElementById(`${pageName}`);
    page.classList.remove('d-none');
}


function addMenuSelectionForPage(pageName) {
    // Selected page gets highlighted in darker color
    if (pageName != 'help') {
        let menupoint = document.getElementById(`menu-${pageName}`);
        menupoint.classList.add('sidebar-menu-option-dark');
    }
}





