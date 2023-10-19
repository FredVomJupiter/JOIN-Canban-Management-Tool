let taskTemplate = new TaskTemplate();
let taskDetailTemplate = new TaskDetailTemplates();
let contactTemplate = new ContactTemplate();

// Local instance of the database collected from the server.
let contacts = [];
let categories = [];
let subtasks = [];
let tasks = [];

const baseUrl = 'http://127.0.0.1:8000/api/v1/';
const token = localStorage.getItem('token').replace(/"/g, '');

/**
 * Init function that is called when dashboard.html is loaded.
 * Starts sending parallel requests to the server to collect data.
 */
async function init() {
    if (hasToken()) {
        greetUser();
        let promises = [getContacts(), getCategories(), getSubtasks(), getTodos()];
        await Promise.all(promises).finally(() => {
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
 * Writes greeting with username from localStorage.
 */
function greetUser() {
    let user = JSON.parse(localStorage.getItem('username'));
    let greeting = document.getElementById('username');
    greeting.innerHTML = "";
    greeting.innerHTML = user;
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


async function getTodos() {
    let response = await fetch(baseUrl + 'todos/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Authorization': " Token " + token },
    }).catch(error => { console.log(error) });
    let data = await response.json();
    tasks = data;
}