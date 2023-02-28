let links = {
    login: "login.html",
    summary: "dashboard.html",
}

let pages = [
    "summary",
    "board",
    "addtask",
    "contacts"
]

let menus = [
    "menu-summary",
    "menu-board",
    "menu-addtask",
    "menu-contacts"
]


function openPage(pageName) {
    hidePages();
    removeDarkMenu();
    let page = document.getElementById(`${pageName}`);
    page.classList.remove('d-none');
    let menupoint = document.getElementById(`menu-${pageName}`);
    menupoint.classList.add('sidebar-menu-option-dark')
}


function hidePages() {
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
