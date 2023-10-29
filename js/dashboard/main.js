let taskTemplate = new TaskTemplate();
let taskDetailTemplate = new TaskDetailTemplates();
let contactTemplate = new ContactTemplate();

const baseUrl = 'https://frederi1c.pythonanywhere.com/api/v1/';
const token = localStorage.getItem('token').replace(/"/g, '');

/**
 * Init function that is called when dashboard.html is loaded.
 * Starts sending parallel requests to the server to collect data.
 */
async function init() {
    if (hasToken()) {
        let promises = [getContacts(), getCategories(), getSubtasks(), getTasks(), getLoggedUser()];
        await Promise.all(promises).finally(() => {
            greetUser();
            updateCounters(); // In 2_summary.js
        }).catch(error => { console.log(error) });
    } else {
        window.open('./login.html', '_self'); // Redirect to Login page if no token is available.
    }
}

/**
 * Simple check if a token is available to prevent manual access via url.
 */
function hasToken() {
    return localStorage.getItem('token') != null ? true : false;
}

/**
 * Writes greeting with username from api call to the summary page.
 */
function greetUser() {
    let greeting = document.getElementById('username');
    greeting.innerHTML = "";
    greeting.innerHTML = loggedUser.username;
}


function showDeletePromt() {
    openSignout(); // close the small menu on the top right corner of the page.
    if (loggedUser.username != 'guest') {
        showDeleteAlert("account");
    } else {
        showAlert("You cannot delete the guest account.");
    }
}

/**
 * Removes the alert promt and the token, then shows success message and redirects to login page.
 */
function handleLogout() {
    localStorage.removeItem('token');
    let overlay = document.createElement('div');
    overlay.classList.add('overlay-background');
    document.body.appendChild(overlay);
    showAlert('Your Account has been deleted.');
    setTimeout(() => {
        window.open('./login.html', '_self');
    }, 3000);
}


//
// API CALLS START HERE
//


async function getLoggedUser() {
    let response = await fetch(baseUrl + 'user/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    loggedUser = data;
}


async function getContacts() {
    let response = await fetch(baseUrl + 'contacts/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    contacts = data;
}


async function getCategories() {
    let response = await fetch(baseUrl + 'categories/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    categories = data;
}


async function getSubtasks() {
    let response = await fetch(baseUrl + 'subtasks/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    subtasks = data;
}


async function getTasks() {
    let response = await fetch(baseUrl + 'todos/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    tasks = data;
}

/**
 * Updates a specific task in the database.
 * @param {*} task as object
 * @returns task as object
 */
async function setTask(task) {
    let response = await fetch(baseUrl + 'todos/' + task.id + '/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}

/**
 * Updates a specific subtask in the databse.
 * @param {*} subtask as object
 * @returns subtask as object
 */
async function setSubtask(subtask) {
    let response = await fetch(baseUrl + 'subtasks/' + subtask.id + '/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subtask)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}


async function setContact(contact) {
    let response = await fetch(baseUrl + 'contacts/' + contact.id + '/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}


async function createContact(contact) {
    let response = await fetch(baseUrl + 'contacts/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}


async function createCategory(category) {
    let response = await fetch(baseUrl + 'categories/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}


async function createSubtask(subtask) {
    let response = await fetch(baseUrl + 'subtasks/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subtask)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}


async function createTask() {
    let response = await fetch(baseUrl + 'todos/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    }).catch(error => { console.log(error) });
    let data = await response.json();
    return data;
}


async function deleteUser() {
    let response = await fetch(baseUrl + 'delete-account/' + loggedUser.id, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    if (data.message == 'Account deleted.') {
        handleLogout();
        return data;
    }
    return data;
}


async function deleteTask(id) {
    let response = await fetch(baseUrl + 'todos/' + id + '/', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': " Token " + token,
            'Content-Type': 'application/json'
        },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    if (data.message == 'Task deleted.') {
        await getTasks();
        hideTaskDetails();
        openPage('board');
        showAlert("Task deleted successfully.");
        return data;
    }
    return data;
}