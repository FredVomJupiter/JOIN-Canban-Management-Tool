/**
 * Prepares the contact form for creating a new contact.
 */
function openContactForm() {
    toggleContactForm();
    clearContactFormInput();
    newContact = new Contact(null, null, null, null);
}


function clearContactFormInput() {
    document.getElementById('contactFormName').value = "";
    document.getElementById('contactFormEmail').value = "";
    document.getElementById('contactFormPhone').value = "";
    document.getElementById('contactFormColor').value = "";
}