/**
 * Prepares the contact form for editing an existing contact.
 * @param {*} contactId as number.
 */
function showEditContact(contactId) {
    if (contacts.find(contact => contact.id == contactId).user.id != loggedUser.id) {
        showAlert("You can ony edit your own contacts.");
        return;
    }
    toggleContactForm();
    newContact = contacts.find(contact => contact.id == contactId);
    transferContactDataToForm(contact);
    changeContactBtnAndTitle(); // change buttons to "Update Contact"
}


function transferContactDataToForm(contact) {
    document.getElementById('contactFormName').value = contact.name;
    document.getElementById('contactFormEmail').value = contact.email;
    document.getElementById('contactFormPhone').value = contact.phone;
    document.getElementById('contactFormColor').value = contact.color;
}


function changeContactBtnAndTitle() {
    document.getElementById('newContact').classList.add('d-none');
    document.getElementById('editContact').classList.remove('d-none');
    document.getElementById('newContactBtn').classList.add('d-none');
    document.getElementById('editContactBtn').classList.remove('d-none');
}