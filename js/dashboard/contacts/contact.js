function renderContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = "";
    const alphabet = returnAlphabet();
    alphabet.forEach(letter => {
        if (filterContactByLetter(contacts, letter).length > 0) {
            renderContactsSortedByAlphabet(contactList, letter);
        }
    });
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
        contactList.innerHTML += contactTemplate.getContactList(contact);
    });
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


function hideContact() {
    let contactCanvas = document.getElementById('contactCanvas');
    contactCanvas.classList.add('d-none');
    let contactList = document.getElementById('contactsInner');
    contactList.classList.remove('d-none');
}


function markSelectedContact(id) {
    renderContactList();
    let wrapper = document.getElementById(`${id}wrap`);
    wrapper.classList.remove('contact');
    wrapper.classList.add('contact-dark');
    let name = document.getElementById(`${id}name`);
    name.classList.add('text-white');
}


const isValidNewEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const isValidNewPhone = phone => {
    const re = /^[0-9]{8,10}$/;
    return re.test(String(phone));
}