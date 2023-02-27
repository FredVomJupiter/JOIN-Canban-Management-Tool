let links = {
    signup: "0_signup_responsive.html",
    resetpw: "0_resetpw_responsive.html",
    forgotpw: "0_forgotpw_responsive.html",
    login: "0_login.html",
    summary: "1_summary.html",
    board: "2_board.html",
    addtask: "3_add_task.html",
    contacts: "4_contacts.html",
    legal: "5_legal.html",
    help: "6_help.html"
}

function openPage(pageName) {
    window.open(links[pageName], "_self");
}