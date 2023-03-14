// Functionality for Contacts Page
function openAddcontactOverlay() {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let addcontact = document.getElementById('addcontactOverlay');
    addcontact.classList.remove('d-none');
}


function renderContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = "";
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Other"];
    alphabet.forEach(letter => {
        if (filterContactByLetter(contacts, letter).length > 0) {
            let filteredContacts = filterContactByLetter(contacts, letter);
            contactList.innerHTML += contactTemplate.getContactLetter(letter);
            filteredContacts.forEach(contact => {
                contactList.innerHTML += contactTemplate.getContactList(contact);
            });
        }
    });
}


function filterContactByLetter(contacts, letter) {
    return contacts.filter(contact => contact.name.charAt(0).toUpperCase() == letter);
}


function showContact(id) {
    let contact = contacts.filter(contact => contact.id == id);
    let contactCanvas = document.getElementById('contactCanvas');
    contactCanvas.innerHTML = "";
    contactCanvas.innerHTML = contactTemplate.getContactDetails(contact[0].name, contact[0].email, contact[0].phone, contact[0].color);
    markSelectedContact(contact[0].id);
}


function markSelectedContact(id) {
    renderContactList();
    let wrapper = document.getElementById(`${id}wrap`);
    wrapper.classList.remove('contact-template-wrap');
    wrapper.classList.add('contact-template-wrap-dark');
    let name = document.getElementById(`${id}name`);
    name.classList.remove('contact-template-name');
    name.classList.add('contact-template-name-light');
}


// Adding Contacts Here

const addForm = document.getElementById('formAddcontact');
const addContactname = document.getElementById('addcontactInputName');
const addEmail = document.getElementById('addcontactInputEmail');
const addPhone = document.getElementById('addcontactInputPhone');


addForm.addEventListener('submit', e => {
    e.preventDefault();
    validateAddInputs();
});


const setAddError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setAddSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidNewEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidNewPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}

const validateAddInputs = () => {
    const nameValue = addContactname.value.trim();
    const emailValue = addEmail.value.trim();
    const phoneValue = addPhone.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPhone = false;

    if (nameValue === '') {
        setAddError(addContactname, 'Name is required');
        correctName = false;
    } else {
        setAddSuccess(addContactname);
        correctName = true;
    }

    if (emailValue === '') {
        setAddError(addEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidNewEmail(emailValue)) {
        setAddError(addEmail, 'Only valid email formats allowed with @ and ending ".xy(z)"');
        correctMail = false;
    } else {
        setAddSuccess(addEmail);
        correctMail = true;
    }

    if (phoneValue === '') {
        setAddError(addPhone, 'Phone number is required');
        correctPhone = false;
    } else if (!isValidNewPhone(phoneValue)) {
        setAddError(addPhone, 'Only numbers allowed with min 8 and max 10 digits');
        correctPhone = false;
    } else {
        setAddSuccess(addPhone);
        correctPhone = true;
    }

    if (correctName & correctMail & correctPhone) {
        saveNewContact();
    }
};


function saveNewContact() {
    let name = document.getElementById('addcontactInputName').value;
    let email = document.getElementById('addcontactInputEmail').value;
    let phone = document.getElementById('addcontactInputPhone').value;
    let contact = new Contact(name, email, phone, colors[contacts.length]);
    contacts.push(contact);
    saveLocalStorage('contacts');
    closeOverlay();
    renderContactList();
    initNewTask();
    showContact(contact.id);
    clearNewcontactInputfields();
}


function clearNewcontactInputfields() {
    document.getElementById('addcontactInputName').value = "";
    document.getElementById('addcontactInputEmail').value = "";
    document.getElementById('addcontactInputPhone').value = "";
}


// Edit Contacts Here

let editContactname;
let editEmail;
let editPhone;

let contactId = ""; // Stores contactId for selected-contact


function openEditcontactOverlay(name) {
    let background = document.getElementById("overlayBackground");
    background.classList.remove("d-none");
    let editcontact = document.getElementById('editcontactOverlay');
    editcontact.classList.remove('d-none');
    editcontact.innerHTML = "";
    let filtered = contacts.filter(contact => contact.name == name);
    editcontact.innerHTML = contactTemplate.getEditcontactOverlay(filtered[0].name, filtered[0].email, filtered[0].phone);
    // setting Id for editcontact.js functions and calling initEditDOM from there
    contactId = filtered[0].id;
    initEditDOM();
}


function initEditDOM() {
    const editForm = document.getElementById('formEditcontact');
    editContactname = document.getElementById('editcontactInputName');
    editEmail = document.getElementById('editcontactInputEmail');
    editPhone = document.getElementById('editcontactInputPhone');

    editForm.addEventListener('submit', e => {
        e.preventDefault();
        validateEditcontactInputs();
    });
}


const setEditError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setEditSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEditEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidEditPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}

const validateEditcontactInputs = () => {
    const nameValue = editContactname.value.trim();
    const emailValue = editEmail.value.trim();
    const phoneValue = editPhone.value.trim();

    let correctName = false;
    let correctMail = false;
    let correctPhone = false;

    if (nameValue === '') {
        setEditError(editContactname, 'Name is required');
        correctName = false;
    } else {
        setEditSuccess(editContactname);
        correctName = true;
    }

    if (emailValue === '') {
        setEditError(editEmail, 'Email is required');
        correctMail = false;
    } else if (!isValidEditEmail(emailValue)) {
        setEditError(editEmail, 'Only valid email formats allowed with @ and ending ".xy(z)"');
        correctMail = false;
    } else {
        setEditSuccess(editEmail);
        correctMail = true;
    }

    if (phoneValue === '') {
        setEditError(editPhone, 'Phone number is required');
        correctPhone = false;
    } else if (!isValidEditPhone(phoneValue)) {
        setEditError(editPhone, 'Only numbers allowed with min 8 and max 10 digits');
        correctPhone = false;
    } else {
        setEditSuccess(editPhone);
        correctPhone = true;
    }

    if (correctName & correctMail & correctPhone) {
        saveEditedContact();
    }
};


function saveEditedContact() {
    contacts.forEach(contact => {
        if (contact.id == contactId) {
            contact.name = document.getElementById('editcontactInputName').value;
            contact.email = document.getElementById('editcontactInputEmail').value;
            contact.phone = document.getElementById('editcontactInputPhone').value;
        }
    });
    saveLocalStorage('contacts');
    closeOverlay();
    renderContactList();
    showContact(contactId);
}