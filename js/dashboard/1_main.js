let taskTemplate = new TaskTemplate();
let contactTemplate = new ContactTemplate();

const baseUrl = 'http://127.0.0.1:8000/api/v1/';

/**
 * Here it all starts.
 */
async function init() {
    if (hasToken()) {
        greetUser();
        await getDataFromAPI().then(() => {
            updateCounters();
            renderCards();
        });
        } else {
            window.open('./login.html', '_self'); // Redirect to Login page if no token is available.
        }
}

    /**
     * Simple check if a token is available to prevent manual access via url.
     */
    function hasToken() {
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


    async function getDataFromAPI() {
        await getContacts();
        await getCategories();
        await getSubtasks();
        await getTodos();
    }


    async function getContacts() {
        await fetch(baseUrl + 'contacts/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Authorization': " Token " + document.cookie.split('=')[1] },
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        contacts = data;
                        console.log(contacts);
                    })
            })
            .catch(error => { console.log(error) });
    }


    async function getCategories() {
        await fetch(baseUrl + 'categories/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Authorization': " Token " + document.cookie.split('=')[1] },
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        categories = data;
                        console.log(categories);
                    })
            })
            .catch(error => { console.log(error) });
    }


    async function getSubtasks() {
        await fetch(baseUrl + 'subtasks/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Authorization': " Token " + document.cookie.split('=')[1] },
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        subtasks = data;
                        console.log(subtasks);
                    })
            })
            .catch(error => { console.log(error) });
    }


    async function getTodos() {
        await fetch(baseUrl + 'todos/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Authorization': " Token " + document.cookie.split('=')[1] },
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        todos = data;
                        console.log(todos);
                    })
            })
            .catch(error => { console.log(error) });
    }