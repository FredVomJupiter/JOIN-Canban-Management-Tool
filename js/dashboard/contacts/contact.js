function renderContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = "";
    const alphabet = returnAlphabet();
    alphabet.forEach(letter => {
        if (filterContactByLetter(contacts, letter).length > 0) {
            renderContactsSortedByAlphabet(contactList, letter);
        }
    });
    showContactList();
}


function returnAlphabet() {
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Other"];
}


function filterContactByLetter(contacts, letter) {
    return contacts.filter(contact => contact.name.charAt(0).toUpperCase() == letter);
}


function renderContactsSortedByAlphabet(contactList, letter) {
    let filteredContacts = filterContactByLetter(contacts, letter);
    contactList.innerHTML += contactTemplate.getContactLetter(letter);
    filteredContacts.forEach(contact => {
        contact.user.id == loggedUser.id ? contactList.innerHTML += contactTemplate.getContactList(contact) : null;
    });
}

/**
 * Resets the state of the contact page to show the contact list.
 * Hides the contactForm (create & update) and contactCanvas (details).
 */
function showContactList() {
    let contactList = document.getElementById('contactsInner');
    contactList.classList.remove('d-none');
    let contactCanvas = document.getElementById('contactCanvas');
    contactCanvas.classList.add('d-none');
    let contactForm = document.getElementById('contactForm');
    contactForm.classList.add('d-none');
}


function showContact(id) {
    let contact = contacts.find(contact => contact.id == id);
    drawContactTemplate(contact);
    markSelectedContact(contact.id);
}


function drawContactTemplate(contact) {
    let contactCanvas = document.getElementById('contactCanvas');
    contactCanvas.classList.remove('d-none');
    let contactList = document.getElementById('contactsInner');
    contactList.classList.add('d-none');
    contactCanvas.innerHTML = "";
    contactCanvas.innerHTML = contactTemplate.getContactDetails(contact.name, contact.email, contact.phone, contact.color);
}

/**
 * Sets the background and text color of the selected contact.
 * @param {*} id as number.
 */
function markSelectedContact(id) {
    unmarkAllContacts();
    let wrapper = document.getElementById(`${id}wrap`);
    wrapper.classList.remove('contact');
    wrapper.classList.add('contact-dark');
    let name = document.getElementById(`${id}name`);
    name.classList.add('text-white');
}


function unmarkAllContacts() {
    for (contact of contacts) {
        let wrapper = document.getElementById(`${contact.id}wrap`);
        if (wrapper != null) {
            wrapper.classList.remove('contact-dark');
            wrapper.classList.add('contact');
            let name = document.getElementById(`${contact.id}name`);
            name.classList.remove('text-white');
        }
    }
}

/**
 * Moves to addtask page with the default new Task containing the selected contact.
 * @param {*} contactId as number.
 */
function addtaskWithContact(contactId) {
    clearAddtaskMenu();
    openPage('addtask');
    newTask.assigned_to.push(Number(contactId));
    let selected = document.getElementById('addtaskMenuAssigned');
    for (const option of selected.options) {
        if (newTask.assigned_to.includes(Number(option.value))) {
            option.selected = true;
        }
    }
    showSelectedContacts();
}

/**
 * Shows the contact form. Can be called for new contact or edit contact.
 */
function toggleContactForm() {
    let contactForm = document.getElementById('contactForm');
    contactForm.classList.remove('d-none');
    let contactCanvas = document.getElementById('contactCanvas');
    contactCanvas.classList.add('d-none');
    let contactList = document.getElementById('contactsInner');
    contactList.classList.add('d-none');
}

/**
 * Main function for creating a new contact or updating an existing contact.
 * @param {*} type as string: 'create' or 'update'.
 */
async function collectAndSendContact(type) {
    let contactName = document.getElementById('contactFormName').value.trim();
    let contactEmail = document.getElementById('contactFormEmail').value.trim();
    let contactPhone = document.getElementById('contactFormPhone').value.trim();
    let contactColor = document.getElementById('contactFormColor').value.trim();

    if (contactName === "" || contactEmail === "" || contactPhone === "" || contactColor === "") {
        showAlert("Please fill in all fields!");
        return;
    }

    if (!isValidEmail(contactEmail)) {
        showAlert("Email not valid! example@here.com");
        return;
    }

    if (!isValidPhone(contactPhone)) {
        showAlert("Phone number not valid: 8-10 digits.");
        return;
    }

    newContact.name = contactName;
    newContact.email = contactEmail;
    newContact.phone = contactPhone;
    newContact.color = contactColor;

    closeContactForm();

    if (type === 'create') {
        await createContact(newContact);
        showAlert("Contact created successfully.");
    } else {
        await setContact(newContact);
        showAlert("Contact updated successfully.");
    }

    await getContacts();
    renderContactList();
}

/**
 * Email must contain a prefix, @ and a domain.
 * @param {*} email as string.
 * @returns true if email is valid.
 */
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Phone must contain 8-10 digits.
 * @param {*} phone as string.
 * @returns true if phone is valid.
 */
const isValidPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}



function closeContactForm() {
    let contactList = document.getElementById('contactsInner');
    contactList.classList.remove('d-none');
    let contactForm = document.getElementById('contactForm');
    contactForm.classList.add('d-none');
}